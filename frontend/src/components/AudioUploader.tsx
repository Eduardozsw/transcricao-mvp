"use client"
import React, { useState } from "react";
import { handleUpload } from "../utils/handleUpload";

export default function AudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [idioma, setIdioma] = useState("ptbr")
  const [engine, setEngine] = useState<"vosk" | "whisper">("vosk")
  const [transcricao, setTranscicao] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function enviar() {
    if (!file) return alert("Por favor, insira um arquivo para continuar.")
    setLoading(true)
    const texto = await handleUpload(file, idioma, engine)
    setTranscicao(texto)
    setLoading(false)
  }

  return (
    <div>
      <h1>Enviar áudio para transcrição</h1>

      <input
        type="file"
        accept="audio/"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />

      <div>
        <label htmlFor="">Idioma:</label>
        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="ptbr">Português</option>
          <option value="en">Inglês</option>
          <option value="inen">Inglês sotaque Indiano</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="radio"
            checked={engine === "vosk"}
            onChange={() => setEngine("vosk")} />
          Vosk
        </label>
        <label>
          <input
            type="radio"
            checked={engine === "whisper"}
            onChange={() => setEngine("whisper")}
          />
          Whisper
        </label>
      </div>

      <button onClick={enviar} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {transcricao && (
        <div>
          <h2>Transcrição:</h2>
          <p>{transcricao}</p>
        </div>
      )}
    </div>
  )
}