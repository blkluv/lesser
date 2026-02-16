export async function askAI(prompt: string, systemPrompt?: string): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, systemPrompt }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error("AI request failed: " + error);
  }
  
  const data = await res.json();
  return data.result;
}