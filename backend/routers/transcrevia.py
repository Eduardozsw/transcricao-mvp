import uuid, shutil, os
from dotenv import load_dotenv
from appwrite.appwrite_client import storage, databases
from fastapi import APIRouter, UploadFile, File, HTTPException, Form

router = APIRouter()
load_dotenv()

DATABASE_ID = os.environ["APPWRITE_DATABASE_ID"]
COLLECTION_ID = os.environ["APPWRITE_COLLECTION_ID"]
BUCKET_ID = os.environ["APPWRITE_BUCKET_ID"]
LIMIT_BYTES = 1.5 * 1024 * 1024 * 1024

engine = ["whisper", "vosk"]


def get_bucket_usage():
    files = storage.list_files(bucket_id=BUCKET_ID)
    return sum(f["sizeOriginal"] for f in files["files"])


@router.post("/upload")
async def upload(
    file: UploadFile = File(...), user_id: str = "", engine: str = Form(...)
):
    if get_bucket_usage() >= LIMIT_BYTES:
        raise HTTPException(
            status_code=503,
            detail="Limite do armazenamento foi antigido, não foi possível guardar o seu vídeo",
        )

    temp_path = f"/tmp/{uuid.uuid4().hex}_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(temp_path, "rb") as f:
        appwrite_file = storage.create_file(BUCKET_ID, "unique()", f)

    audio_url = (
        f"https://cloud.appwrite.io/v1/storage/buckets/"
        f"https://cloud.appwrite.io/v1/storage/buckets/{BUCKET_ID}/files/{appwrite_file['$id']}/view?project=6892b0fd002d8719a2dd"
        )

    doc = databases.create_document(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        {
            "userId": user_id,
            "audioFileId": appwrite_file["$id"],
            "audioFileName": file.filename,
            "audioUrl": audio_url,
            "transcription": None,
            "engine": engine,
        },
    )

    os.remove(temp_path)

    return {"sucesso": True, "data": doc}
