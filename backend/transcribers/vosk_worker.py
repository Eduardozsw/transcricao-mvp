import json
import os
import wave
from io import BytesIO
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment
from redis import Redis
import time

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

MODELOS_VOSK = {
    "pt": {
        "url": "https://alphacephei.com/vosk/models/vosk-model-small-pt-0.3.zip",
        "folder": "vosk-model-small-pt-0.3",
    },
    "en": {
        "url": "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip",
        "folder": "vosk-model-small-en-us-0.15",
    },
}


def converter_para_wav(file_path):
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    return wav_io

def process_job(job_id, file_path, idioma):
    redis_client.hset(f"progress:{job_id}", "progress", 20)
    wav_audio = converter_para_wav(file_path)

    # Resolve model path relative to this file: backend/model/<folder>
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.normpath(os.path.join(base_dir, "..", "model", MODELOS_VOSK[idioma]['folder']))
    model = Model(model_path)
    redis_client.hset(f"progress:{job_id}", "progress", 40)

    resultado = []
    with wave.open(wav_audio, "rb") as wf:
        total_frames = wf.getnframes()
        rec = KaldiRecognizer(model, wf.getframerate())
        processed_frames = 0

        while True:
            data = wf.readframes(1000)
            if len(data) == 0:
                break
            processed_frames += 1000
            progress = min(40 + 50 * processed_frames / total_frames, 90)
            redis_client.hset(f"progress:{job_id}", "progress", progress)
            if rec.AcceptWaveform(data):
                text = json.loads(rec.Result())["text"]
                resultado.append(text)

        final = json.loads(rec.FinalResult())["text"]
        resultado.append(final)

    redis_client.hset(f"progress:{job_id}", "progress", 100)
    redis_client.set(f"transcription_result:{job_id}", " ".join(resultado))
    # Remove from queue tracking set if present
    redis_client.zrem("queue:transcription_jobs", job_id)

if __name__ == "__main__":
    last_id = "0-0"
    while True:
        jobs = redis_client.xread({"transcription_jobs": last_id}, block=0, count=1)
        for stream, messages in jobs:
            for message_id, fields in messages:
                file_path = fields["file_path"]
                idioma = fields["idioma"]
                process_job(message_id, file_path, idioma)
                last_id = message_id
