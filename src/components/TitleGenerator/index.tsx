import React, { useState } from 'react';
import type { ToneType, GeneratedTitle, Settings } from '../../types';
import { updateUsage, getRemainingQueries } from '../../utils/storage';
import { generateTitles } from '../../services/ai';
import { TitleInput } from './TitleInput';
import { ModelSelector } from './ModelSelector';
import { TitleList } from './TitleList';
import { ActionButtons } from './ActionButtons';
import { GenerateButton } from './GenerateButton';
import { ErrorMessage } from './ErrorMessage';

const DEFAULT_API_KEY = 'AIzaSyB-mbtvvT-za3GLMET4QNt51qmdwpK9MxY';
const DEFAULT_TONE: ToneType = 'Casual';
const MAX_TITLES = 20;

export const TitleGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState<ToneType>(DEFAULT_TONE);
  const [settings, setSettings] = useState<Settings>({ model: 'Default' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [titles, setTitles] = useState<GeneratedTitle[]>([]);
  const [remaining, setRemaining] = useState(getRemainingQueries());

  const handleClear = () => {
    setKeyword('');
    setTone(DEFAULT_TONE);
    setSettings({ model: 'Default' });
    setError('');
    setTitles([]);
  };

  const handleGenerate = async (isGenerateMore: boolean = false) => {
    if (!keyword.trim()) {
      setError('Please enter keywords');
      return;
    }

    if (settings.model === 'Default') {
      if (!updateUsage()) {
        setError(`Daily query limit reached. Try again tomorrow or use a different AI model.`);
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
      setError(err.message || 'Failed to generate titles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <ActionButtons onClear={handleClear} />

        <div className="space-y-6">
          <TitleInput
            keyword={keyword}
            setKeyword={setKeyword}
            tone={tone}
            setTone={setTone}
          />

          <GenerateButton
            onClick={() => handleGenerate(false)}
            loading={loading}
          />

          <ModelSelector
            settings={settings}
            setSettings={setSettings}
            remaining={remaining}
          />

          <ErrorMessage message={error} />

          <TitleList
            titles={titles}
            loading={loading}
            onGenerateMore={() => handleGenerate(true)}
            maxTitles={MAX_TITLES}
          />
        </div>
      </div>
    </div>
  );
};