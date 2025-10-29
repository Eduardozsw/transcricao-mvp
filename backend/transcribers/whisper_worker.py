import os
import whisper
from pydub import AudioSegment
from redis import Redis

# Redis client (configurable)
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

# Directory for temporary files (absolute within backend/)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "temp"))
os.makedirs(TEMP_DIR, exist_ok=True)

def converter_para_wav(file_path):
    """Convert any audio file to WAV format with 16kHz, mono, 2-byte sample width"""
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    wav_path = os.path.join(TEMP_DIR, os.path.basename(file_path).rsplit(".", 1)[0] + ".wav")
    audio.export(wav_path, format="wav")
    return wav_path

def process_job(job_id, file_path):
    """Process a Whisper job: convert audio, transcribe, and store progress/results"""
    
    # Start progress
    redis_client.hset(f"progress:{job_id}", "progress", 20)

    # Convert to WAV
    wav_path = converter_para_wav(file_path)
    redis_client.hset(f"progress:{job_id}", "progress", 40)

    # Load Whisper model
    model = whisper.load_model("tiny")
    redis_client.hset(f"progress:{job_id}", "progress", 50)

    # Transcribe audio
    result = model.transcribe(wav_path)
    text = result["text"]

    # Save final progress and transcription
    redis_client.hset(f"progress:{job_id}", "progress", 100)
    redis_client.set(f"transcription_result:{job_id}", text)
    # Remove from queue tracking set if present
    redis_client.zrem("queue:transcription_jobs_whisper", job_id)

    # Clean up temporary files
    os.remove(file_path)
    os.remove(wav_path)

if __name__ == "__main__":
    last_id = "0-0"
    print("Whisper worker started, waiting for jobs...")
    
    while True:
        # Read new jobs from Redis stream
        jobs = redis_client.xread({"transcription_jobs_whisper": last_id}, block=0, count=1)
        for stream, messages in jobs:
            for message_id, fields in messages:
                file_path = fields["file_path"]
                print(f"Processing Whisper job {message_id} -> {file_path}")
                process_job(message_id, file_path)
                last_id = message_id
