# 🗣️ Transcrevia

**Transcrevia** is a free and open-source platform that converts audio files into text using advanced transcription engines. Built with **FastAPI** on the backend and **Next.js** on the frontend, it offers both speed and flexibility for users looking to transcribe audio with precision or efficiency.

## 🌐 Live Website

🔗 [https://www.transcrevia.com.br](https://www.transcrevia.com.br)

---

## 🚀 Features

- 🔊 **Supports multiple engines**:  
  - **Whisper** (OpenAI) for high-accuracy transcription.  
  - **Vosk** for lightweight and offline-compatible transcription.

- 🔄 **Automatic audio conversion** to WAV 16kHz mono (via `pydub`)  
- 🌍 **Multi-language support** (`pt` and `en` with Vosk)  
- 🔐 **Frontend authentication** using Clerk  
- ⚡ Hosted on Render  
- 🌱 Open-source and free to use

---

## 🛠️ Technologies Used

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [Vosk](https://alphacephei.com/vosk/)
- [OpenAI Whisper](https://github.com/openai/whisper)
- [Pydub](https://github.com/jiaaro/pydub)
- [Requests, Wave, JSON, Threading, etc.]
- docker

### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.dev/)
- [TypeScript, React]

---

## 📂 How to Use Locally

### 1. Clone the repository
```bash
git clone https://github.com/Eduardozsw/transcricao-mvp.git
cd transcrevia
```

### 2. Backend Setup (Python 3.10+)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

> ⚠️ The backend will automatically download Vosk models on first use.

---

## 📌 Project Structure

```
transcrevia/
├── backend/
│   ├── main.py          # FastAPI app
│   ├── ...
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── ...
```

---

## 💡 Future Improvements

- UI loading state and feedback
- Transcription history per user
- Option to export transcript (TXT)
- Real-time transcription with websockets

---

## 📬 Contributing

Pull requests are welcome! If you’d like to suggest a feature or report a bug, feel free to open an issue.

---

## 🧑‍💻 Author

**Carlos Eduardo**  
🔗 [LinkedIn](https://www.linkedin.com/in/carloseduardossm/)
