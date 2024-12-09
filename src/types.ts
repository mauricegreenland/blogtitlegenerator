export type ToneType = 'Funny' | 'Excited' | 'Formal' | 'Casual' | 'Friendly' | 'Persuasive' | 'Professional';

export type AIModel = 'Default' | 'ChatGPT';

export interface GeneratedTitle {
  id: string;
  title: string;
}

export interface Settings {
  model: AIModel;
  apiKey?: string;
}

export interface UsageData {
  date: string;
  count: number;
}