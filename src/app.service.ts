import { Injectable, InternalServerErrorException } from '@nestjs/common';

type AiMode = 'summary' | 'tips';

@Injectable()
export class AppService {
  private readonly aiApiKey = process.env.APIBLUESMIND_API_KEY || '';
  private readonly aiModel = process.env.APIBLUESMIND_MODEL || 'gpt-5-mini';
  private readonly aiBaseUrl =
    process.env.APIBLUESMIND_BASE_URL ||
    'https://api.apibluesmind.com/v1/chat/completions';

  // ✅ MAIN PAGE
  getLandingPage(): string {
    return `
<!DOCTYPE html>
<html>
<head>
<title>Blue Green ELB</title>
</head>
<body style="font-family: Arial; background:#0f172a; color:white; text-align:center; padding-top:100px">
<h1>Hello World! 🚀</h1>
<p>HELLO from blue-green-elb</p>
<button onclick="fetchAI('summary')">AI Summary</button>
<button onclick="fetchAI('tips')">AI Tips</button>

<pre id="output" style="margin-top:20px;"></pre>

<script>
async function fetchAI(type){
  document.getElementById('output').innerText = 'Thinking...';

  try{
    const res = await fetch('/ai/' + type, { method:'POST' });
    const data = await res.json();

    document.getElementById('output').innerText =
      data.result || 'No response';
  }catch(e){
    document.getElementById('output').innerText = 'Error calling AI';
  }
}
</script>
</body>
</html>
    `;
  }

  // ✅ AI FUNCTION (FIXED)
  async generateAiInsight(mode: AiMode): Promise<string> {
    if (!this.aiApiKey) {
      return 'AI key missing. Add APIBLUESMIND_API_KEY in .env';
    }

    const prompt =
      mode === 'summary'
        ? 'Summarize this deployment in 5 bullet points.'
        : 'Give 6 performance and UI improvement tips.';

    try {
      const response = await fetch(this.aiBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.aiApiKey}`,
        },
        body: JSON.stringify({
          model: this.aiModel,
          messages: [
            { role: 'system', content: 'You are a DevOps AI expert.' },
            { role: 'user', content: prompt },
          ],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} ${text}`);
      }

      const data = await response.json();

      // ✅ FIXED LINE (your error was here)
      const result =
        data?.choices?.[0]?.message?.content ||
        data?.output?.[0]?.content?.[0]?.text ||
        'AI returned empty response';

      return String(result);
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unknown AI error',
      );
    }
  }
}