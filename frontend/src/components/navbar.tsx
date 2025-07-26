
export default function Navbar() {
  return (
    <header className="flex justify-around py-1 mt-2 border-b-2 border-b-gray-100">
        <h1 className="text-2xl font-bold">Transcritor</h1>
        <div className="flex gap-x-4 ">
          <a href="/">Home</a>
          <a href="">Preços</a>
          <a href="">Login/Registrar</a>
        </div>
      </header>
  )
}
