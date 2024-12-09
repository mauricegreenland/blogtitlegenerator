import React from 'react';
import { Copy, Loader2 } from 'lucide-react';
import type { GeneratedTitle } from '../../types';

interface TitleListProps {
  titles: GeneratedTitle[];
  loading: boolean;
  onGenerateMore: () => void;
  maxTitles: number;
}

export const TitleList: React.FC<TitleListProps> = ({
  titles,
  loading,
  onGenerateMore,
  maxTitles
}) => {
  const copyToClipboard = async (title: string) => {
    try {
      await navigator.clipboard.writeText(title);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (titles.length === 0) return null;

  return (
    <div className="mt-6 space-y-2">
      {titles.map((title) => (
        <div
          key={title.id}
          className="flex items-center justify-between p-3 bg-neutral-mediumGray rounded hover:bg-neutral-darkGray transition-colors"
        >
          <p className="text-white">{title.title}</p>
          <button
            onClick={() => copyToClipboard(title.title)}
            className="text-neutral-lightGray hover:text-primary-main transition-colors"
          >
            <Copy size={16} />
          </button>
        </div>
      ))}
      
      {titles.length < maxTitles && (
        <button
          onClick={onGenerateMore}
          disabled={loading}
          className="w-full mt-4 bg-primary-main text-white p-2 rounded hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
  );
};