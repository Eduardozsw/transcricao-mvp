import os, json, wave, zipfile, requests, threading
from io import BytesIO
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment

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
        return caminho_extraido
    
async def converter_para_wav(files_byte: bytes) -> BytesIO:
    audio = AudioSegment.from_file
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    return wav_io

async def transcribe_vosk(files_bytes: bytes, idioma: str) -> str:
    modelo_info = MODELOS_VOSK[idioma]
    caminho_modelo = baixar_modelo(
        modelo_info["url"], "./model", modelo_info["pasta"], idioma
    )

    wav_audio = await converter_para_wav(files_bytes)

    model = Model(caminho_modelo)
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
        resultado.append[final]

    return " ".join(resultado)
