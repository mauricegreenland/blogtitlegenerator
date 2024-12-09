import { ToneType } from '../types';

const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateWithChatGPT(keyword: string, tone: ToneType, apiKey: string): Promise<string[]> {
  const systemPrompt = `Generate SEO-optimized blog titles that are engaging, clear, and follow best practices. Each title should:
- Be 60 characters or less
- Include the main keyword naturally
- Be engaging and click-worthy
- Match the specified tone
- Follow search intent (informational, commercial, etc.)
- Avoid generic phrases and buzzwords
- When suggesting titles, ensure each suggestion is unique, varied, and contextually relevant. Avoid repetitive patterns or similar phrasings across multiple suggestions.`;

  try {
    const response = await fetch(CHATGPT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: systemPrompt
        }, {
          role: 'user',
          content: `Keywords: ${keyword}\nTone: ${tone}\n\nGenerate 10 titles:`
        }],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.choices[0].message.content;
    
    return rawText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('Here') && !line.startsWith('1.'))
      .map(title => title.replace(/^\d+\.\s*/, ''))
      .filter(title => title.length > 0 && title.length <= 60)
      .slice(0, 10);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate titles with ChatGPT');
  }
}