export async function handleUpload(
  file: File,
  idioma: string,
  engine: "vosk" | "whisper"
) {
  const baseUrl = "https://transcricao-mvp-z6yc.vercel.app";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("idioma", idioma);

  const endpoint = engine === "vosk" ? "vosk" : "whisper";


  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`, {
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
