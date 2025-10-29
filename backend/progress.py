from fastapi import APIRouter, HTTPException
from redis import Redis
import os

router = APIRouter(prefix="/progress", tags=["Progress"])

# Allow overriding Redis connection via environment
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

@router.get("/{job_id}")
def get_progress(job_id: str):
    try:
        progress_value = redis_client.hget(f"progress:{job_id}", "progress")
        # If no progress has been written yet, report queued with 0%
        if progress_value is None:
            return {
                "job_id": job_id,
                "progress": 0.0,
                "status": "queued",
            }

        # Determine simple status based on progress or existence of result
        status = "queued"
        progress_float = float(progress_value)
        if progress_float > 0.0 and progress_float < 100.0:
            status = "processing"
        elif progress_float >= 100.0 or redis_client.exists(f"transcription_result:{job_id}"):
            status = "completed"

        return {
            "job_id": job_id,
            "progress": progress_float,
            "status": status,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving progress: {e}")

@router.get("/result/{job_id}")
def get_result(job_id: str):
    try:
        result = redis_client.get(f"transcription_result:{job_id}")
        if not result:
            raise HTTPException(status_code=404, detail="Result not found for this job")

        return {
            "job_id": job_id,
            "transcription": result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving result: {e}")
