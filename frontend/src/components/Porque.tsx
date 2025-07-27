import Image from "next/image";
import foguete from "../../public/foguete-inclinado.png"
import money from "../../public/money-bag.png"
import suporte from "../../public/suporte-tecnico.png"

export default function Porque() {
  return (
    <main className="py-10">
      <div className="flex justify-center text-center pb-10">
        <h1 className="text-3xl font-bold">Por que você deve usar o transcritor.</h1>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="max-w-1/3 w-full"></div>
        <div className="max-w-1/3 flex flex-col justify-center items-start gap-y-8">

          <div className="">
            <div className="flex flex-wrap items-center">
              <Image src={money} alt="alt" width={50} />
              <h1 className="text-2xl">Preço</h1>
            </div>
            <p>O nosso site possui o menor preço do mercado. Qual o preço? R$ 10 reais por hora de transcrição.</p>
          </div>

          <div className="">
            <div className="flex flex-wrap items-center">
              <Image src={foguete} alt="alt" width={50} />
              <h1 className="text-2xl text-center">Velocidade</h1>
            </div>
            <p className="">Transcrições entregues em instantes.</p>
          </div>

          <div className="">
            <div className="flex flex-wrap items-center">
              <Image src={suporte} alt="alt" width={50} />
              <h1 className="text-2xl text-center">Suporte técnico</h1>
            </div>
            <p className="">Qualquer dúvida sobre o transcritor basta entrar em contato através do email: *Colocar email*</p>
          </div>

        </div>
        
      </div>
    </main>
  )
}
