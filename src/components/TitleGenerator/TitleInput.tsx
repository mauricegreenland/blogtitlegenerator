import React from 'react';
import type { ToneType } from '../../types';

interface TitleInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  tone: ToneType;
  setTone: (value: ToneType) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({
  keyword,
  setKeyword
}) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-4 rounded-full bg-white text-neutral-darkest border border-neutral-lightGrayBlue focus:border-primary-main focus:ring-1 focus:ring-primary-main focus:ring-opacity-50 placeholder-neutral-lightGray"
        placeholder="Enter your keywords..."
      />
    </div>
  );
};