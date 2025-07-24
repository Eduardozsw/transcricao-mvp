import AudioUploader from "@/components/AudioUploader"


export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="justify-center text-center mt-[10%]">
        <h1 className="text-white font-bold text-5xl">Transcritor</h1>
      </div>
      <div className="justify-center text-center mt-5">
        <AudioUploader />
      </div>
    </main>
  )
}
