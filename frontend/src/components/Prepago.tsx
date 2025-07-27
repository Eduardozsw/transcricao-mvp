
export default function Prepago() {
  return (
    <main className="bg-gray-100">
      <div className="flex justify-center py-10">
        <h1 className="text-3xl font-bold">Pacotes pré-pagos</h1>
      </div>
      <div className="flex justify-around ">
        <div>
          <h1 className="font-bold text-2xl">Pacote de 30 minutos</h1>
          <p className="font-semibold py-5 text-center">20 Reais</p>
          <p className="pb-5">Você paga R$0.6 por minuto de transcrição</p>
          <p>Comprimento do arquivo 30 minutos</p>
        </div>
        <div>
          <h1 className="font-bold text-2xl">Pacote de 60 minutos</h1>
          <p className="font-semibold py-5 text-center">50 reais</p>
          <p className="pb-5">Você paga R$0.83 por minuto de transcrição</p>
          <p>Comprimento do arquivo 1 hora</p>
        </div>
        <div>
          <h1 className="font-bold text-2xl">Pacote de 180 minutos</h1>
          <p className="font-semibold py-5 text-center">160 reais</p>
          <p className="pb-5">Você paga R$0.8 por minuto de transcrição</p>
          <p>Comprimento do arquivo 3 horas</p>
        </div>
      </div>
    </main>
  )
}
