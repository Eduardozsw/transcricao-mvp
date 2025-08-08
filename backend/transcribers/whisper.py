import os
import whisper
from io import BytesIO
from pydub import AudioSegment

async def converter_para_wav(files_byte: bytes) -> BytesIO:
    audio = AudioSegment.from_file
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    return wav_io

async def transcribe_whisper(files_bytes: bytes) -> str:
    model = whisper.load_model("tiny")
    wav_audio = await converter_para_wav(files_bytes)

    with open("temp.wav", "wb") as f:
        f.write(wav_audio.read())

    result = model.transcribe("temp.wav")
    os.remove("temp.wav")
    return result["text"]