export async function handleUpload(
  file: File,
  idioma: string,
  engine: "vosk" | "whisper"
) {
  const formData = new FormData();
  formData.append("file", file)
  formData.append("idioma", idioma)

  const endpoint = engine === "vosk" ? "vosk" : "whisper"

  try {
    const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar áudio:${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error(`Erro no upload:`, error);
    return null
  }
}