import { ArrowRight, Check } from "lucide-react";

export default function Prepago() {
  return (
    <section id="precos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Planos que Cabem no Seu Orçamento
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano ideal para suas necessidades de transcrição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plano Básico */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Básico</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">R$ 29</span>
              <span className="text-gray-600 ml-2">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">5 horas de transcrição</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Formatos básicos</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Suporte por email</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Editor básico</span>
              </li>
            </ul>
            <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Começar Agora
            </button>
          </div>

          {/* Plano Profissional */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 transform scale-105 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Profissional</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$ 79</span>
              <span className="opacity-80 ml-2">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-200" />
                <span>25 horas de transcrição</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-200" />
                <span>Todos os formatos</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-200" />
                <span>Suporte prioritário</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-200" />
                <span>Editor avançado</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-blue-200" />
                <span>Colaboração em equipe</span>
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Começar Agora
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Empresarial</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">R$ 199</span>
              <span className="text-gray-600 ml-2">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">100 horas de transcrição</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">API completa</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Suporte 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Usuários ilimitados</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">SLA garantido</span>
              </li>
            </ul>
            <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Falar com Vendas
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Todos os planos incluem 7 dias de teste gratuito</p>
          <p className="text-sm text-gray-500">Cancele a qualquer momento • Sem taxas ocultas • Suporte incluído</p>
        </div>
      </div>
    </section>
  )
}
