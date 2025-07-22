import wave
import whisper
from io import BytesIO
from pydub import AudioSegment
from vosk import Model, KaldiRecognizer
from fastapi import FastAPI, UploadFile, File, Form
import json

app = FastAPI()
model = Model("modelo\\PT-BR")  # modelo vosk
model_whisper = whisper.load_model("base") # modelo whisper

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
    conteudo = await file.read()
    wav_audio = await converter_para_wav(conteudo)

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

    resultado = model_whisper.transcribe("temp.wav", language="pt")

    return {"nome": file.filename, "transcricao": resultado["text"]}