
import VoskAudioUploader from "@/components/VoskAudioUploader";

export default function vosk() {
  return (
    <main className="text-center">
      <h1 className="text-5xl font-bold mt-10">Vosk</h1>
      <div className="flex justify-center">

        <p className="max-w-100 text-center">Maior velocidade nas suas transcrições porém menos precisão. Considere assinar o <a href="/whisper" className="text-blue-300 underline">premium</a> para uma transcrição mais precisa</p>
      </div>
      
      <VoskAudioUploader />
    </main>
  )
}
