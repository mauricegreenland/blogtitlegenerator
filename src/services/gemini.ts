import { ToneType } from '../types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

export async function generateWithGemini(keyword: string, tone: ToneType, apiKey: string): Promise<string[]> {
  const systemPrompt = `Generate SEO-optimized blog titles that are engaging, clear, and follow best practices. Each title should:
- Be 60 characters or less
- Include the main keyword naturally
- Be engaging and click-worthy
- Match the specified tone
- Follow search intent (informational, commercial, etc.)
- Avoid generic phrases and buzzwords
- When suggesting titles, ensure each suggestion is unique, varied, and contextually relevant. Avoid repetitive patterns or similar phrasings across multiple suggestions.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nKeywords: ${keyword}\nTone: ${tone}\n\nGenerate 10 titles:`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;
    
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
    throw new Error('Failed to generate titles with Gemini');
  }
}