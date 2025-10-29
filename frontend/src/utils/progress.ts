export function getBaseURL() {
  return process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://fastapi-backend-6s4c.onrender.com";
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProgress(jobId: string) {
  const res = await fetch(`${getBaseURL()}/progress/${jobId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getResult(jobId: string) {
  const res = await fetch(`${getBaseURL()}/progress/result/${jobId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getQueuePosition(engine: "vosk" | "whisper", jobId: string) {
  const res = await fetch(`${getBaseURL()}/queue/position/${engine}/${encodeURIComponent(jobId)}`);
  if (!res.ok) return null;
  return res.json();
}

