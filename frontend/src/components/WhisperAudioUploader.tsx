"use client"
import React, { useState } from "react";
import { handleUpload } from "../utils/handleUpload";

export default function WhisperAudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [idioma, setIdioma] = useState("ptbr")
  const [transcricao, setTranscricao] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  

  async function enviar() {
    if (!file) return alert("Por favor, insira um arquivo para continuar.")
    setLoading(true)
    const engine = "whisper"
    const texto = await handleUpload(file, idioma, engine)
    console.log("Texto recebido:", texto)
    setTranscricao(texto)
    setLoading(false)
  }
  return (
    <div className="">
      <h1 className="font-bold text-3xl pb-10 mt-10">Enviar áudio para transcrição</h1>

      <input
        className="font-bold border-b-4 border-b-gray-300 active:border-b-0  rounded-2xl p-2 bg-white"
        type="file"
        accept="audio/"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />

      <button onClick={enviar} disabled={loading} className="bg-white border-b-4 border-b-gray-300 active:border-b-0 p-2 rounded-2xl mt-5">
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