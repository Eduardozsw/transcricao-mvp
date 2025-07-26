
import WhisperAudioUploader from "@/components/WhisperAudioUploader" 

export default function whisper() {
  return (
    <main className="text-center">
      <h1 className="text-5xl font-bold mt-10">Whisper</h1>
      <div className="flex justify-center">
        <p className="max-w-100 text-center">Máxima precisão e qualidade na sua transcrição</p>
      </div>
      
      <WhisperAudioUploader />
    </main>
  )
}
