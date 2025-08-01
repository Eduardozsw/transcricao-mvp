import React from 'react';
import { Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforme Áudio em
            <span className="text-blue-600 block">Texto Perfeito</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A ferramenta de transcrição mais avançada do mercado. IA de última geração,
            precisão incomparável e velocidade que impressiona. Experimente agora mesmo!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/vosk">
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="h-5 w-5" />
                Use Agora
              </button>
            </Link>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%+</div>
              <div className="text-gray-600">Precisão Garantida</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5min</div>
              <div className="text-gray-600">Tempo Médio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
              <div className="text-gray-600">Usuários Satisfeitos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}