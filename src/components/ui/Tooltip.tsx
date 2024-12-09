import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => (
  <div className="group relative inline-block">
    <HelpCircle className="w-4 h-4 text-neutral-lightGray hover:text-primary-main cursor-help transition-colors" />
    <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-neutral-darkest rounded-lg shadow-lg pointer-events-none">
      {content}
    </div>
  </div>
);