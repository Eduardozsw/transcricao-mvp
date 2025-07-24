"use client"
import React, { useState } from "react";
import { handleUpload } from "../utils/handleUpload";

export default function AudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [idioma, setIdioma] = useState("ptbr")
  const [engine, setEngine] = useState<"vosk" | "whisper">("vosk")
  const [transcricao, setTranscricao] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function enviar() {
    if (!file) return alert("Por favor, insira um arquivo para continuar.")
    setLoading(true)
    
    const texto = await handleUpload(file, idioma, engine)
    console.log("Texto recebido:", texto)
    setTranscricao(texto)
    setLoading(false)
  }
  return (
    <div className="">
      <h1 className="font-bold text-3xl text-white pb-10">Enviar áudio para transcrição</h1>

      <input
        className="font-bold border-b-4 border-b-gray-300 active:border-b-0  rounded-2xl p-2 bg-white"
        type="file"
        accept="audio/"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />

      <div className="mt-5">
        <label className="font-bold text-white ">Idioma:</label>
        <select className="bg-transparent active:bg-transparent  text-white" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option className="text-black" value="ptbr">Português</option>
          <option className="text-black" value="en">Inglês</option>
          <option className="text-black" value="inen">Inglês sotaque Indiano</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="text-white text-2xl" >
          <input
            className=""
            type="radio"
            checked={engine === "vosk"}
            onChange={() => setEngine("vosk")} />
          Vosk
        </label>
        <label className="text-white text-2xl ml-5">
          <input
            type="radio"
            checked={engine === "whisper"}
            onChange={() => setEngine("whisper")}
          />
          Whisper
        </label>
      </div>

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