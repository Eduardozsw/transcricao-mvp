import { getBaseURL, getProgress, getResult, getQueuePosition, sleep } from "./progress";

type Engine = "vosk" | "whisper";

export async function handleUpload(
  file: File,
  idioma: string,
  engine: Engine,
  onProgress?: (p: { progress?: number; status?: string; position?: number | null }) => void
) {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = engine === "vosk" ? "vosk" : "whisper";
  if (engine === "vosk" && idioma) {
    formData.append("idioma", idioma);
  }

  try {
    const response = await fetch(`${getBaseURL()}/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar áudio: ${response.statusText}`);
    }

    const data = await response.json();
    const jobId: string = data.job_id;

    // Notify initial queue position if available
    if (onProgress) {
      const pos = await getQueuePosition(engine, jobId);
      if (pos && typeof pos.position !== "undefined") {
        onProgress({ position: pos.position });
      }
    }

    // Poll for progress until completion
    while (true) {
      const prog = await getProgress(jobId);
      if (prog && onProgress) {
        onProgress({ progress: prog.progress, status: prog.status });
      }
      if (prog && (prog.status === "completed" || prog.progress >= 100)) {
        break;
      }
      await sleep(1500);
    }

    const res = await getResult(jobId);
    return res?.transcription ?? null;
  } catch (error) {
    console.error("Erro no upload:", error);
    return null;
  }
}
