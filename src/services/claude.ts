import { ToneType } from '../types';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

interface ClaudeResponse {
  content: Array<{ text: string }>;
  error?: { message: string };
}

export async function generateWithClaude(keyword: string, tone: ToneType, apiKey: string): Promise<string[]> {
  const systemPrompt = `Generate SEO-optimized blog titles that are engaging, clear, and follow best practices. Each title should:
- Be 60 characters or less
- Include the main keyword naturally
- Be engaging and click-worthy
- Match the specified tone
- Follow search intent (informational, commercial, etc.)
- Avoid generic phrases and buzzwords`;

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2024-03-01',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        messages: [{
          role: 'user',
          content: `${systemPrompt}\n\nGenerate 10 unique blog titles based on:\nKeywords: ${keyword}\nTone: ${tone}\n\nProvide only the titles, one per line, without numbering or additional text.`
        }],
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Claude API key and try again.');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 500) {
        throw new Error('Claude API service error. Please try again later.');
      }
      throw new Error('Failed to connect to Claude API');
    }

    const data = await response.json() as ClaudeResponse;
    
    if (!data.content?.[0]?.text) {
      throw new Error('Invalid response format from Claude API');
    }

    const titles = data.content[0].text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('Here') && !line.startsWith('1.'))
      .map(title => title.replace(/^\d+\.\s*/, ''))
      .filter(title => title.length > 0 && title.length <= 60)
      .slice(0, 10);

    if (titles.length === 0) {
      throw new Error('No valid titles were generated');
    }

    return titles;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate titles with Claude');
  }
}