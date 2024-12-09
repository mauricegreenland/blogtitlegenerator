import { AIModel, ToneType } from '../types';
import { generateWithGemini } from './gemini';
import { generateWithChatGPT } from './chatgpt';

export async function generateTitles(
  keyword: string,
  tone: ToneType,
  model: AIModel,
  apiKey: string
): Promise<string[]> {
  switch (model) {
    case 'Default':
      return generateWithGemini(keyword, tone, apiKey);
    case 'ChatGPT':
      return generateWithChatGPT(keyword, tone, apiKey);
    default:
      throw new Error('Invalid AI model selected');
  }
}