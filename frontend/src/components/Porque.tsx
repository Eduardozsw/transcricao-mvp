import React from 'react';
import { Zap, Shield, FileText, Users, Clock, Star } from 'lucide-react';

export default function Porque() {
  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Por que Escolher Nossa Ferramenta?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvida com tecnologia de ponta para oferecer a melhor experiência de transcrição do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Super Rápido</h3>
            <p className="text-gray-600">
              Transcreva horas de áudio em minutos. Nossa IA processa arquivos até 10x mais rápido que a concorrência.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">100% Seguro</h3>
            <p className="text-gray-600">
              Criptografia militar e servidores seguros. Seus dados são protegidos e nunca compartilhados.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-formato</h3>
            <p className="text-gray-600">
              Suporte para MP3, WAV, M4A, MP4 e mais. Exporte em TXT, DOCX, SRT ou PDF.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Para Equipes</h3>
            <p className="text-gray-600">
              Colabore em tempo real, gerencie projetos e mantenha sua equipe sincronizada.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Timestamps</h3>
            <p className="text-gray-600">
              Marcações de tempo precisas para facilitar navegação e edição do conteúdo.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">IA Avançada</h3>
            <p className="text-gray-600">
              Reconhecimento de voz de última geração com suporte a múltiplos idiomas e sotaques.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
