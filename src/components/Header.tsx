import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-5xl font-bold text-neutral-darkest flex items-center justify-center gap-2">
        Blog Title Generator <Sparkles className="text-primary-main" />
      </h1>
    </header>
  );
};