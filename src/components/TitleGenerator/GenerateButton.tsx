import React from 'react';
import { Wand2, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full bg-primary-main text-white p-3 rounded-full font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
  >
    {loading ? (
      <>
        <Loader2 className="animate-spin" />
        Generating...
      </>
    ) : (
      <>
        <Wand2 size={20} />
        GENERATE
      </>
    )}
  </button>
);