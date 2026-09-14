import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'System configuration error: API Key missing.' });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are a Senior Network Automation & Support Expert acting as an interactive portfolio showcase.
Your job is to diagnose network topology maps, configurations, latency packets, or system logs provided by the user. 
Provide a clear, enterprise-grade analysis breaking down the root cause, immediate mitigation steps, and a long-term automated fix (e.g., Python, Ansible, or CI/CD guardrails). 
Keep responses crisp, structured with markdown, and highly professional to demonstrate engineering competence to assessing recruiters.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Network Issue:\n" + message }] }
      ]
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to process infrastructure diagnosis.' });
  }
}