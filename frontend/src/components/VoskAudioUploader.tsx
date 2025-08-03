"use client"
import React, { useState } from 'react';
import {
  Upload,
  FileAudio,
  Download,
  Loader2,
  Mic,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import { handleUpload } from "../utils/handleUpload";

export default function VoskAudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [idioma, setIdioma] = useState("pt")
  const [transcricao, setTranscricao] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    setFile(file);
    setTranscricao('');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const downloadTranscription = () => {
    const element = document.createElement('a');
    const blob = new Blob([transcricao ?? ''], { type: "text/plain" });
    element.href = URL.createObjectURL(blob);
    element.download = `transcricao_${file ? file.name.split('.')[0] : 'arquivo'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };


  async function enviar() {
    if (!file) return alert("Por favor, insira um arquivo para continuar.")
    setLoading(true)
    const engine = "vosk"
    const texto = await handleUpload(file, idioma, engine)
    console.log("Texto recebido:", texto)
    setTranscricao(texto)
    setLoading(false)
  }
  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Use o Vosk para transcrever
          </h1>
          <p className="text-xl text-gray-600">
            Faça upload do seu arquivo e receba a transcrição em minutos
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Arraste seu arquivo aqui
              </h3>
              <p className="text-gray-600 mb-6">
                Ou clique para selecionar um arquivo
              </p>
              <input
                type="file"
                accept="audio/*,video/*,.mp3,.wav,.m4a,.mp4,.mov,.avi"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-block"
              >
                Selecionar Arquivo
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Suportamos MP3, WAV, M4A, MP4, MOV e outros formatos
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Arquivo Selecionado */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileAudio className="h-12 w-12 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{file.name}</h3>
                      <p className="text-gray-600">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setTranscricao('');
                    }}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>

              {/* Seleção de Idioma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma do Áudio
                </label>
                <select
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                  <option value="ptBR">Português (Brasil)</option>
                  <option value="en">Inglês (EUA)</option>
                  <option value="inen">Inglês com sotaque indiano</option>
                </select>
              </div>

              {/* Botão de Transcrição */}
              <button
                onClick={enviar}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Transcrevendo...
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Iniciar Transcrição
                  </>
                )}
              </button>

              {/* Resultado da Transcrição */}
              {transcricao && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Resultado da Transcrição
                    </h3>
                    <button
                      onClick={downloadTranscription}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Baixar
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {transcricao}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Processamento Rápido</h3>
            <p className="text-gray-600 text-sm">
              Transcrições processadas em até 5 minutos
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Seguro</h3>
            <p className="text-gray-600 text-sm">
              Seus arquivos são protegidos e excluídos após o processamento
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Alta Precisão</h3>
            <p className="text-gray-600 text-sm">
              Mais de 95% de precisão na transcrição
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
