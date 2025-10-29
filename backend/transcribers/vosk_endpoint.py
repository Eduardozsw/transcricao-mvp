from fastapi import File, Form, UploadFile, APIRouter
from redis import Redis
import os
import time

transcribe_vosk_endpoint = APIRouter()

# Allow configuring Redis via environment
REDIS_URL = os.getenv("REDIS_URL")
if REDIS_URL:
    redis_client = Redis.from_url(REDIS_URL, decode_responses=True)
else:
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_DB = int(os.getenv("REDIS_DB", "0"))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
    redis_client = Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        db=REDIS_DB,
        password=REDIS_PASSWORD,
        ssl=True,
        decode_responses=True
    )

@transcribe_vosk_endpoint.post("/vosk")
async def enqueue_vosk(
    file: UploadFile = File(...),
    idioma: str = Form(...)
):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    temp_dir = os.path.normpath(os.path.join(base_dir, "..", "temp"))
    os.makedirs(temp_dir, exist_ok=True)

    file_bytes = await file.read()
    file_path = os.path.join(temp_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file_bytes)

    job_data = {
        "file_path": file_path,
        "idioma": idioma
    }

    # Add to stream (for worker consumption)
    job_id = redis_client.xadd("transcription_jobs", job_data)

    # Mirror into a sorted set to track queue order for position queries
    # Use the current timestamp as score to preserve enqueue order
    redis_client.zadd("queue:transcription_jobs", {job_id: time.time()})
    position = redis_client.zrank("queue:transcription_jobs", job_id)
    position = int(position) + 1 if position is not None else None

    return {
        "job_id": job_id,
        "position": position,
        "message": "Job enqueued successfully"
    }


