from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transcribers.vosk_endpoint import transcribe_vosk_endpoint
from transcribers.whisper_endpoint import transcribe_whisper_endpoint
from progress import router as progress_router
from queue_routes import router as queue_router

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

# Import and include your engine-specific endpoints
app.include_router(transcribe_vosk_endpoint)
app.include_router(transcribe_whisper_endpoint)
app.include_router(progress_router)
app.include_router(queue_router)