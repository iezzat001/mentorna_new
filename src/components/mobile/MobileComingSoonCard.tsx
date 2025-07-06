import React from 'react';
import { Lock, LucideIcon } from 'lucide-react';

interface MobileComingSoonCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const MobileComingSoonCard = ({ title, subtitle, description, icon: Icon, gradient }: MobileComingSoonCardProps) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/40">
      {/* Content */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-lg font-black mb-1 leading-tight">
            {title}
          </h3>
          
          <p className="text-accent-yellow font-semibold text-sm mb-2 leading-tight">
            {subtitle}
          </p>
          
          <p className="text-white/85 text-sm leading-relaxed mb-3">
            {description}
          </p>
          
          {/* Status */}
          <div className="flex items-center text-white/70 text-xs">
            <Lock className="w-3 h-3 mr-2 text-accent-yellow" />
            <span className="font-medium">Details revealed to early subscribers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileComingSoonCard;