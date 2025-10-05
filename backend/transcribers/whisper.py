from fastapi import FastAPI, UploadFile, Form, File, APIRouter
from fastapi.responses import JSONResponse
import os
import whisper
from io import BytesIO
from pydub import AudioSegment

transcribe_whisper_endpoint = APIRouter()

async def converter_para_wav(files_byte: bytes) -> BytesIO:
    audio = AudioSegment.from_file(BytesIO(files_byte))
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    return wav_io

async def transcribe_whisper(files_bytes: bytes) -> str:
    model = whisper.load_model("tiny")
    wav_audio = await converter_para_wav(files_bytes)

    # Save temporary WAV file
    temp_path = "temp.wav"
    with open(temp_path, "wb") as f:
        f.write(wav_audio.read())

    result = model.transcribe(temp_path)
    os.remove(temp_path)
    return result["text"]

@transcribe_whisper_endpoint.post("/whisper")
async def whisper_endpoint(
    file: UploadFile = File(...),
    idioma: str = Form(...)
):
    files_bytes = await file.read()
    texto = await transcribe_whisper(files_bytes)
    return {"transcricao": texto}
