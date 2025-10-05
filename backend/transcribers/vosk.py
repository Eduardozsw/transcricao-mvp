import os, json, wave, zipfile, requests, threading
from io import BytesIO
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment
from fastapi import FastAPI, UploadFile, Form, File, APIRouter
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocket
import asyncio
import uuid

transcribe_vosk_endpoint = APIRouter()

progress_store = {}

MODELOS_VOSK = {
    "pt": {
        "url": "https://alphacephei.com/vosk/models/vosk-model-small-pt-0.3.zip",
        "pasta": "vosk-model-small-pt-0.3",
    },
    "en": {
        "url": "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip",
        "pasta": "vosk-model-small-en-us-0.15",
    },
}

locks_por_idioma = {
    "pt": threading.Lock(),
    "en": threading.Lock(),
}

def baixar_modelo(modelo_url, destino, nome_pasta, idioma, job_id):
    lock = locks_por_idioma[idioma]
    with lock:
        caminho_extraido = os.path.join(destino, nome_pasta)
        if os.path.exists(caminho_extraido):
            progress_store[job_id] = 10
            return
        os.makedirs(destino, exist_ok=True)
        zip_path = os.path.join(destino, "model.zip")
        print("baixando modelo, aguarde.")
        with requests.get(modelo_url, stream=True) as r:
            total = int(r.headers.get("content-length", 0))
            downloaded = 0
            with open(zip_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
                    downloaded += len(chunk)
                    progress_store[job_id] = min(10 * downloaded / total, 10)

        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(destino)
        os.remove(zip_path)
        progress_store[job_id] = 15
        return caminho_extraido
    
async def converter_para_wav(files_byte: bytes, job_id: str) -> BytesIO:
    audio = AudioSegment.from_file(BytesIO(files_byte))
    progress_store[job_id] = 20
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    progress_store[job_id] = 25
    return wav_io

@transcribe_vosk_endpoint.post("/vosk")
async def transcribe_vosk(
    file: UploadFile = File(...),
    idioma: str = Form(...)
):
    job_id = str(uuid.uuid4())
    progress_store[job_id] = 0
    # Read the uploaded file
    files_bytes = await file.read()

    modelo_info = MODELOS_VOSK[idioma]
    caminho_modelo = baixar_modelo(
        modelo_info["url"], "./model", modelo_info["pasta"], idioma
    )

    wav_audio = await converter_para_wav(files_bytes)

    model = Model(caminho_modelo)
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
            progress_store[job_id] = min(25 + 75 * processed_frames / total_frames, 100)
            if rec.AcceptWaveform(data):
                text = json.loads(rec.Result())["text"]
                resultado.append(text)

        final = json.loads(rec.FinalResult())["text"]
        resultado.append(final)

    progress_store[job_id] = 100
    return {"transcricao": " ".join(resultado), "progress": progress_store[job_id]}

@transcribe_vosk_endpoint.websocket("/ws/vosk/{job_id}")
async def websocket_progress(websocket: WebSocket, job_id: str):
    await websocket.accept()
    while True:
        progress = progress_store.get(job_id, 0)
        await websocket.send_json({"progress": progress})
        if progress >= 100:
            break
        await asyncio.sleep(0.1)
    await websocket.close()