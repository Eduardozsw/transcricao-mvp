import { Mic } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Mic className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">Transcrevia</span>
          </div>
          <div className="text-gray-400 text-center md:text-right">
            <p>&copy; 2025 Transkritor. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">Transformando áudio em texto com precisão</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
