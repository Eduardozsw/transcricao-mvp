export async function handleUpload(
  file: File,
  idioma: string,
  engine: "vosk" | "whisper"
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("idioma", idioma);

  const endpoint = engine === "vosk" ? "vosk" : "whisper";


  try {
    const url = `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    console.log(url)

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar áudio: ${response.statusText}`);
    }

    const data = await response.json();
    return data.transcricao;
  } catch (error) {
    console.error("Erro no upload:", error);
    return null;
  }
}
