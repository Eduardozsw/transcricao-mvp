"use client"

import { UserButton } from "@clerk/nextjs";
import { FileAudio, Home, Mic } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<'home' | 'transcribe'>('home')

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Transkritor</span>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'home'
                  ? 'bg-blue-100 text-blue-600 '
                  : 'text-gray-700 hover:text-blue-600 cursor-pointer'
                  }`}
              >
                <Home className="h-4 w-4" />
                Início
              </button>
            </Link>
            <Link href="/vosk">
              <button
                onClick={() => setActiveTab('transcribe')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'transcribe'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 cursor-pointer'
                  }`}
              >
                <FileAudio className="h-4 w-4" />
                Transcrever
              </button>
            </Link>
          </nav>
          <div>

            <Link href="/vosk">
              <button
                onClick={() => setActiveTab('transcribe')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Começar Agora
              </button>
            </Link>
            <UserButton showName />
          </div>
        </div>
      </div>
    </header >

  )
}
