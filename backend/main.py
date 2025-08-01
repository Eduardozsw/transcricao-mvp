import os
import wave
import json
import whisper
from io import BytesIO
from pydub import AudioSegment
from vosk import Model, KaldiRecognizer
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3000/vosk",
    "http://localhost:3000/whisper"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_whisper = whisper.load_model("tiny") # modelo whisper

@app.get("/")
def home():
    return {"Hello": "World"}

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
    print(f"[LOG] Idioma recebido no backend: '{idioma}'")
    conteudo = await file.read()
    wav_audio = await converter_para_wav(conteudo)

    if idioma == "ptbr":
        model_path = os.path.abspath("modelo/ptbr")
    elif idioma == "en":
        model_path = os.path.abspath("modelo/en")
    elif idioma == "inen":
        model_path = os.path.abspath("modelo/InEn")
    else:
        return {"error": "Idioma não suportado"}
    
    model = Model(model_path)
    resultado = []

    with wave.open(wav_audio, "rb") as wf:
        palavras_chave = '["equity", "frontend", "javascript", "node", "projeto"]'
        rec = KaldiRecognizer(model, wf.getframerate(), palavras_chave)

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
    conteudo = await file.read()
    wav_audio = await converter_para_wav(conteudo)
    
    with open("temp.wav", "wb") as f:
        f.write(wav_audio.read())

    transcricao = model_whisper.transcribe("temp.wav")

    os.remove("temp.wav")
    return {"nome": file.filename, "transcricao": transcricao["text"]}