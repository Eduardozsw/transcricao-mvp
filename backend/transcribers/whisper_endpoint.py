from fastapi import File, UploadFile, APIRouter
from redis import Redis
import os
import time

transcribe_whisper_endpoint = APIRouter()

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

@transcribe_whisper_endpoint.post("/whisper")
async def enqueue_whisper(file: UploadFile = File(...)):
    # Save under backend/temp using absolute path
    base_dir = os.path.dirname(os.path.abspath(__file__))
    temp_dir = os.path.normpath(os.path.join(base_dir, "..", "temp"))
    os.makedirs(temp_dir, exist_ok=True)

    file_bytes = await file.read()
    file_path = os.path.join(temp_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file_bytes)

    job_data = {"file_path": file_path}
    job_id = redis_client.xadd("transcription_jobs_whisper", job_data)

    # Mirror into a sorted set to track queue order
    redis_client.zadd("queue:transcription_jobs_whisper", {job_id: time.time()})
    position = redis_client.zrank("queue:transcription_jobs_whisper", job_id)
    position = int(position) + 1 if position is not None else None

    return {"job_id": job_id, "position": position, "message": "Whisper job enqueued successfully"}
