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
        <div className="flex justify-center">
          <div className="max-w-150">
            <h2>Transcrição:</h2>
            <p className="line-clamp-2">{transcricao}</p>
          </div>
        </div>
      )}
      {transcricao && (
        <button
          onClick={() => {
            const blob = new Blob([transcricao], { type: "text/plain" });
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a");
            a.href = url
            a.download = "transcricao.txt"
            a.click()

            URL.revokeObjectURL(url)
          }}
          className="border-b-4 border-b-gray-300 rounded-2xl p-2 active:border-b-0"
        >
          Baixar transcrição
        </button>
      )}
    </div>
  )
}