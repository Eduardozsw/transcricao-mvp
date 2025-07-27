import image from "../../public/image.png"
import Image from 'next/image'

export default function Hero() {
  return (
    <main className="flex flex-col mb-20">
      <div className="flex justify-around mt-[5%]">
        <div className="">
          <h1 className="text-3xl font-bold max-w-170">Transcreva seus áudios para texto automaticamente.</h1>
          <div className="flex gap-y-2 flex-col font-medium leading-6.5 my-4">
            <p className="max-w-150">Converte qualquer tipo de árquivo de áudio para texto, totalmente de graça através do nosso plano free ou experimente nosso plano pago e desfrute de traduções mais fieis ao áudio original.</p>
            <a href="/vosk" className="p-3 w-fit rounded-2xl bg-black text-white">Experimente agora</a>
          </div>
        </div>
        <div>
          <Image src={image} width={500} height={500} alt="alt" className="rounded-2xl" />
        </div>
      </div>
    </main>
  )
}