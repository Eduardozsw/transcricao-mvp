from fastapi import APIRouter, HTTPException
from redis import Redis
import os

router = APIRouter(prefix="/queue", tags=["Queue"])

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
REDIS_DB = int(os.getenv("REDIS_DB", "0"))
redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)


@router.get("/position/{engine}/{job_id}")
def get_queue_position(engine: str, job_id: str):
    try:
        if engine == "vosk":
            zset_key = "queue:transcription_jobs"
        elif engine == "whisper":
            zset_key = "queue:transcription_jobs_whisper"
        else:
            raise HTTPException(status_code=400, detail="Invalid engine. Use 'vosk' or 'whisper'.")

        rank = redis_client.zrank(zset_key, job_id)
        if rank is None:
            return {"job_id": job_id, "position": None}
        return {"job_id": job_id, "position": int(rank) + 1}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving position: {e}")


@router.get("/length/{engine}")
def get_queue_length(engine: str):
    try:
        if engine == "vosk":
            zset_key = "queue:transcription_jobs"
        elif engine == "whisper":
            zset_key = "queue:transcription_jobs_whisper"
        else:
            raise HTTPException(status_code=400, detail="Invalid engine. Use 'vosk' or 'whisper'.")
        length = redis_client.zcard(zset_key)
        return {"engine": engine, "length": int(length)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving queue length: {e}")


