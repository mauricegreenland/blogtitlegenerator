import React from 'react';
import { Clock, Settings2 } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import type { Settings } from '../../types';

interface ModelSelectorProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  remaining: number;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  settings,
  setSettings,
  remaining
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-neutral-mediumGray">
        <Clock size={16} />
        <span>{remaining} queries remaining</span>
        <span className="text-neutral-lightGray">·</span>
        <span>Resets in 11h 59m</span>
      </div>
      
      <button
        onClick={() => {}} // TODO: Implement settings modal
        className="flex items-center gap-2 text-neutral-mediumGray hover:text-primary-main transition-colors"
      >
        <Settings2 size={16} />
        <span>Settings</span>
      </button>
    </div>
  );
};