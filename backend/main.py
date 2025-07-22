from fastapi import FastAPI, UploadFile, File
from io import BytesIO
import wave
import os
from vosk import Model, KaldiRecognizer
app = FastAPI()

@app.get("/")
def home():
  return {os.path.abspath("modelo")}


model = Model("modelo")
print(os.path.abspath("modelo"))
@app.post("/envio")
async def enviar_arquivo(file: UploadFile = File(...)):
  conteudo = await file.read()
  audio_mem = BytesIO(conteudo)

  with wave.open(audio_mem, "rb") as wf:
    model= Model("modelo")
    rec = KaldiRecognizer(model, wf.getframerate())

  resultado = ""
  while True:
    data = wf.readframes(4000)
    if len(data) == 0:
      break
    if rec.AcceptWaveform(data):
      resultado += rec.Result()

  resultado += rec.FinalResult()    
  return {"nome": file.filename, "Transcrição": resultado}

