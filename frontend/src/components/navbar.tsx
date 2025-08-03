"use client"

import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronDown, FileAudio, Home, Mic } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'home' | 'transcribe'>('home')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-blue-600" />
            <a href="/"><span className="text-2xl font-bold text-gray-900">Transcrevia</span></a>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'home'
                  ? 'bg-blue-100 text-blue-600 cursor-pointer'
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
                  ? 'bg-blue-100 text-blue-600 cursor-pointer'
                  : 'text-gray-700 hover:text-blue-600 cursor-pointer'
                  }`}
              >
                <FileAudio className="h-4 w-4" />
                Transcrever
              </button>
            </Link>
          </nav>
          <div>

            <SignedOut>
              <Link href="/sign-in">
                <button
                  onClick={() => { }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Começar Agora
                </button>
              </Link>
            </SignedOut>
              <div className="relative inline-block text-left">
            <SignedIn>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                >
                  
                  <Image src={user?.imageUrl ?? ""} width={30} height={30} alt="Avatar" className="w-8 h-8 rounded-full" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                    <div className="px-4 py-2">{user?.fullName}</div>
                    <a href="/whisper" className="block px-4 py-2 hover:bg-gray-100">Whisper</a>
                    <a href="/configuracoes" className="block px-4 py-2 hover:bg-gray-100">Configurações</a>
                    <SignOutButton>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Sair</button>
                    </SignOutButton>
                  </div>
                )}
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
    </header >
  );
}

