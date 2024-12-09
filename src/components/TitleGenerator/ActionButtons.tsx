import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ActionButtonsProps {
  onClear: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onClear }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex gap-4">
      <button className="bg-[#EBF2FB] text-primary-main px-6 py-2 rounded-full font-semibold hover:bg-primary-main hover:text-white transition-colors">
        META TITLE
      </button>
      <a
        href="https://mauricegreenland.com/free-ai-tools-for-bloggers"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-neutral-lightGrayBlue text-neutral-darkGray px-6 py-2 rounded-full font-semibold hover:bg-neutral-darkGray hover:text-white transition-colors"
      >
        MORE FREE TOOLS
      </a>
    </div>
    <button
      onClick={onClear}
      className="flex items-center gap-2 px-4 py-2 text-neutral-lightGray hover:text-primary-main rounded-full transition-colors"
    >
      <RefreshCw size={16} />
      Clear
    </button>
  </div>
);