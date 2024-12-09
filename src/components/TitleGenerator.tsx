import React, { useState } from 'react';
import { HelpCircle, Copy, Loader2, RefreshCw } from 'lucide-react';
import type { ToneType, GeneratedTitle, Settings as SettingsType } from '../types';
import { updateUsage, getRemainingQueries } from '../utils/storage';
import { generateTitles } from '../services/ai';

const DEFAULT_API_KEY = 'AIzaSyB-mbtvvT-za3GLMET4QNt51qmdwpK9MxY';
const DEFAULT_TONE: ToneType = 'Casual';
const MAX_TITLES = 20;

const Tooltip = ({ content }: { content: string }) => (
  <div className="group relative inline-block">
    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
    <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none">
      {content}
    </div>
  </div>
);

export const TitleGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState<ToneType>(DEFAULT_TONE);
  const [settings, setSettings] = useState<SettingsType>({ model: 'Default' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [titles, setTitles] = useState<GeneratedTitle[]>([]);
  const [remaining, setRemaining] = useState(getRemainingQueries());

  const tones: ToneType[] = ['Funny', 'Excited', 'Formal', 'Casual', 'Friendly', 'Persuasive', 'Professional'];

  const handleClear = () => {
    setKeyword('');
    setTone(DEFAULT_TONE);
    setSettings({ model: 'Default' });
    setError('');
    setTitles([]);
  };

  const handleGenerate = async (isGenerateMore: boolean = false) => {
    if (!keyword.trim()) {
      setError('Please enter a keyword or topic');
      return;
    }

    if (settings.model === 'Default') {
      if (!updateUsage()) {
        setError(`Daily query limit of 8 reached. Try again tomorrow or use a different AI model.`);
        return;
      }
    } else if (!settings.apiKey) {
      setError('Please enter an API key for the selected model');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const apiKey = settings.model === 'Default' ? DEFAULT_API_KEY : settings.apiKey!;
      const generatedTitles = await generateTitles(keyword, tone, settings.model, apiKey);
      
      if (!generatedTitles || generatedTitles.length === 0) {
        throw new Error('No titles were generated. Please try again.');
      }

      const newTitles = generatedTitles.map((title, index) => ({
        id: `title-${Date.now()}-${index}`,
        title
      }));

      setTitles(prev => {
        const updatedTitles = isGenerateMore ? [...prev, ...newTitles] : newTitles;
        return updatedTitles.slice(0, MAX_TITLES);
      });
      
      setRemaining(getRemainingQueries());
    } catch (err: any) {
      setError(err.message || 'Failed to generate titles. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (title: string) => {
    try {
      await navigator.clipboard.writeText(title);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            className="bg-[#cd5231] text-white px-6 py-2 rounded font-semibold hover:bg-[#b84929]"
          >
            TITLE GENERATOR
          </button>
          <a
            href="https://mauricegreenland.com/free-ai-tools-for-bloggers"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-gray-300 px-6 py-2 rounded font-semibold hover:bg-gray-700"
          >
            MORE FREE TOOLS
          </a>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
        >
          <RefreshCw size={16} />
          Clear
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-gray-400">Keywords *</label>
            <Tooltip content="Enter the main topic or keywords for your blog post. Be specific for better results." />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            placeholder="Enter your blog title keywords or topic"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-gray-400">Tone of Voice *</label>
            <Tooltip content="Select the writing style that best matches your target audience and brand voice." />
          </div>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as ToneType)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          >
            {tones.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white">AI Model</h3>
            <Tooltip content="Choose your preferred AI model. Default model is limited to 8 queries per day. Other models require an API key." />
          </div>
          <select
            value={settings.model}
            onChange={(e) => setSettings({ ...settings, model: e.target.value as any })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="Default">Default (Gemini 1.5 Flash)</option>
            <option value="ChatGPT">ChatGPT (gpt-4)</option>
          </select>
          
          {settings.model !== 'Default' && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-white">API Key</label>
                <Tooltip content="Enter your API key for the selected model. This is required for non-default models." />
              </div>
              <input
                type="password"
                value={settings.apiKey || ''}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                placeholder="Enter your API key"
              />
            </div>
          )}

          {settings.model === 'Default' && (
            <p className="text-yellow-500 mt-2">
              {remaining} queries remaining today
            </p>
          )}
        </div>

        <button
          onClick={() => handleGenerate(false)}
          disabled={loading}
          className="w-full bg-[#cd5231] text-white p-3 rounded font-semibold hover:bg-[#b84929] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" />
              Generating...
            </span>
          ) : 'GENERATE'}
        </button>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {titles.length > 0 && (
          <div className="mt-6 space-y-2">
            {titles.map((title) => (
              <div
                key={title.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded hover:bg-gray-700"
              >
                <p className="text-white">{title.title}</p>
                <button
                  onClick={() => copyToClipboard(title.title)}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy size={16} />
                </button>
              </div>
            ))}
            
            {titles.length < MAX_TITLES && (
              <button
                onClick={() => handleGenerate(true)}
                disabled={loading}
                className="w-full mt-4 bg-gray-700 text-white p-2 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" />
                    Generating More...
                  </span>
                ) : 'Generate More'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};