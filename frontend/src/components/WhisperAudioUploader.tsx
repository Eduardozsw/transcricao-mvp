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
    <main className="text-center h-full flex" style={{ height: 'calc(100vh - 48px)' }}>
      <div className="w-full flex flex-wrap my-10 mx-5 ">
        <div className="w-1/2 bg-gray-100 border-2 rounded-2xl">
          <div className="py-2">

            <h1 className="flex justify-center text-center text-5xl font-bold">Whisper</h1>
            <p>Máxima precisão e velocidade na sua transcrição</p>
          </div>
          <h1 className="flex justify-center text-center font-bold text-3xl py-10">Enviar áudio para transcrição</h1>
          <input
            className="font-bold border-b-4 border-b-gray-300 active:border-b-0  rounded-2xl p-2 bg-white"
            type="file"
            accept="audio/"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
          <button onClick={enviar} disabled={loading} className="bg-white border-b-4 border-b-gray-300 active:border-b-0 p-2 rounded-2xl">
            {loading ? "Enviando..." : "Enviar"}
          </button>

        </div>
        <div className="w-1/2 h-full bg-gray-100 border-2 rounded-2xl py-2">
          {transcricao && (
            <div className="flex justify-center h-1/2">
              <div className="max-w-150">
                <h1 className="text-2xl font-bold">Transcrição:</h1>
                <p className="line-clamp-10 ">{transcricao}</p>
              </div>
            </div>
          )}
          <div className="h-1/2 flex flex-col justify-end">
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
                className="border-b-4 bg-white border-b-gray-300 rounded-2xl p-2 active:border-b-0 cursor-pointer mx-2"
              >
                Baixar transcrição
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}