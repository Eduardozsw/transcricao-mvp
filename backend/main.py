import os
import wave
import json
import zipfile
import whisper
import requests
import threading
from io import BytesIO
from pydub import AudioSegment
from vosk import Model, KaldiRecognizer
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3000/vosk",
    "http://localhost:3000/whisper",
    "https://www.transcrevia.com.br",
    "https://www.transcrevia.com.br/vosk",
    "https://www.transcrevia.com.br/whisper",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

def baixar_modelo(modelo_url, destino, nome_pasta, idioma):
    lock = locks_por_idioma[idioma]
    with lock:
        caminho_extraido = os.path.join(destino, nome_pasta)
        if os.path.exists(caminho_extraido):
            return
        os.makedirs(destino, exist_ok=True)
        zip_path = os.path.join(destino, "model.zip")
        print("baixando modelo, aguarde.")
        with requests.get(modelo_url, stream=True) as r:
            with open(zip_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(destino)
        os.remove(zip_path)
        print("Modelo baixado e extraído")


# Converte qualquer formato de áudio para WAV, 16kHz, mono
async def converter_para_wav(files_bytes: bytes) -> BytesIO:
    audio = AudioSegment.from_file(BytesIO(files_bytes))
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)

    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    return wav_io


# Endpoint para transcrição
@app.post("/vosk")
async def transcrever_vosk(file: UploadFile = File(...), idioma: str = Form(...)):
    conteudo = await file.read()
    if len(conteudo) > 500 * 1024 * 1024:  # 500 MB
        return {"error": "Arquivo excede o limite de 500MB"}
    # Tô baixando os modelos aq
    modelo_info = MODELOS_VOSK[idioma]
    url_modelo = modelo_info["url"]
    nome_pasta = modelo_info["pasta"]
    destino_modelo = "./model"
    caminho_modelo = os.path.join(destino_modelo, nome_pasta)

    baixar_modelo(url_modelo, destino_modelo, nome_pasta)

    # Pra salvar temporariamente
    wav_audio = await converter_para_wav(conteudo)
    model_path = os.path.abspath(caminho_modelo)

    model = Model(model_path)
    resultado = []

    with wave.open(wav_audio, "rb") as wf:
        rec = KaldiRecognizer(model, wf.getframerate())

        while True:
            data = wf.readframes(1000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                text = json.loads(rec.Result())["text"]
                resultado.append(text)

        final = json.loads(rec.FinalResult())["text"]
        resultado.append(final)

    transcricao = " ".join(resultado)
    return {"nome": file.filename, "transcricao": transcricao}


@app.post("/whisper")
async def transcrever_whisper(file: UploadFile = File(...)):
    model_whisper = whisper.load_model("tiny")  # modelo whisper
    conteudo = await file.read()
    wav_audio = await converter_para_wav(conteudo)

    with open("temp.wav", "wb") as f:
        f.write(wav_audio.read())

    transcricao = model_whisper.transcribe("temp.wav")

    os.remove("temp.wav")
    return {"nome": file.filename, "transcricao": transcricao["text"]}
