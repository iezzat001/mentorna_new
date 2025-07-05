
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PhaseHeaderProps {
  phase: string;
  title: string;
  color: string;
  icon: LucideIcon;
}

const PhaseHeader = ({ phase, title, color, icon: IconComponent }: PhaseHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${color} mb-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
        <IconComponent className="w-10 h-10 text-foreground" />
      </div>
      
      <div className={`${color} border-4 border-foreground font-black uppercase px-4 py-2 text-foreground inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
        {phase}
      </div>
    </div>
  );
};

export default PhaseHeader;
