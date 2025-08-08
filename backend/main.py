
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transcribers.vosk import transcribe_vosk
from transcribers.whisper import transcribe_whisper

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://www.transcrevia.com.br"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Servidor online"}

@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    engine: str = Form(...),
    idioma: str = Form("pt")
):
    conteudo = await file.read()
    if len(conteudo) > 200 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Arquivo excedeu o limite de 500MB")
    if engine == "whisper":
        texto = await transcribe_whisper(conteudo)
    elif engine == "vosk":
        texto = await transcribe_vosk(conteudo, idioma)
    else:
        raise HTTPException(status_code=400, detail="Engine inválido")
    
    return {"nome": file.filename, "transcricao": texto}
