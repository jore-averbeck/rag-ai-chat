const API_URL = "http://127.0.0.1:8000";

// =====================================================
// STREAM CHAT
// =====================================================
export async function streamChatMessage(
  message: string,
  onChunk: (chunk: string) => void
) {
  const response = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: message,
    }),
  });

  const reader = response.body?.getReader();

  if (!reader) return;

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    onChunk(chunk);
  }
}


// =====================================================
// NORMAL CHAT (optional fallback)
// =====================================================
export async function sendChatMessage(query: string) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return res.json();
}


// =====================================================
// PDF UPLOAD
// =====================================================
export async function uploadPDF(file: File) {

  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}