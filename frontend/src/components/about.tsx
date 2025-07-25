import Image from "next/image";
import download from "../../public/baixar.png"
import som from "../../public/som.png"
import upload from "../../public/upload.png"

export default function About() {
  return (
    <main className="bg-gray-100">
      <div className="flex justify-center">
        <h1 className='text-black text-3xl font-bold'>Como funciona</h1>
      </div>

      <div className="flex flex-wrap justify-around mt-15">
        <Image src={upload} alt="alt" className="w-10 h-auto flex justify-center align-middle text-center" />
        <Image src={som} alt="alt" className="w-10 h-auto flex justify-center align-middle text-center" />
        <Image src={download} alt="alt" className="w-10 h-auto flex justify-center align-middle text-center" />
      </div>

      <div className="flex justify-around text-black text-2xl font-semibold text-center">
        <div className="">
          <h1 className="max-w-70">Você faz o upload do seu arquivo de áudio</h1>
        </div>
        <div>
          <h1 className="max-w-70">Nosso sistema o transcreve para você</h1>
        </div>
        <div>
          <h1 className="max-w-70">Faça o download do seu arquivo</h1>
        </div>
      </div>
      <div className="flex justify-around w-full">
        <div className="w-1/3 text-center">

          <p>WMA</p>
          <p>MP3</p>
          <p>OGG</p>
          <p>Áudio de whatsapp</p>
        </div>
        <div className="w-1/3 text-center">
          <h1>Através de uma tecnologia para reconhecimento de fala, o nosso sistema é capaz de transcrever seus áudios de maneira rápida </h1>
        </div>
        <div className="w-1/3 text-center">
          <h1>*Colocar tipos de arquivos disponiveis pra baixar*</h1>
        </div>
      </div>
    </main>
  )
}
