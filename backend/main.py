from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.get("/")
def home():
  return {"mensagem": "API de transcrição"}

@app.post("/envio")
async def enviar_arquivo(file: UploadFile = File(...)):
  conteudo = await file.read()
  with open("arquivo_temporario.wav", "wb") as f:
    f.write(conteudo)
    return {"nome": file.filename}