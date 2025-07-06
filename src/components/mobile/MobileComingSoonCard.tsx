
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
    <div className="
      group 
      relative 
      bg-gradient-to-br from-white/10 to-white/5
      backdrop-blur-md 
      border 
      border-white/20 
      rounded-2xl 
      p-6 
      hover:bg-gradient-to-br hover:from-white/15 hover:to-white/8
      hover:border-white/30 
      transition-all 
      duration-500 
      hover:scale-[1.02]
      flex-1
      flex
      flex-col
      overflow-hidden
    ">
      {/* Gradient Overlay */}
      <div className={`
        absolute 
        inset-0 
        bg-gradient-to-br 
        ${gradient} 
        opacity-0 
        group-hover:opacity-10 
        rounded-2xl 
        transition-all
        duration-500
        blur-sm
      `} />
      
      {/* Content */}
      <div className="relative z-10 flex items-start gap-4 flex-1">
        {/* Icon */}
        <div className={`
          w-16 
          h-16 
          rounded-xl 
          bg-gradient-to-br 
          ${gradient} 
          flex 
          items-center 
          justify-center 
          group-hover:scale-110 
          transition-all
          duration-500
          shadow-lg
          shadow-black/20
          flex-shrink-0
        `}>
          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="
            text-xl 
            font-heading 
            font-bold 
            text-white 
            mb-2
            leading-tight
          ">
            {title}
          </h3>
          
          <p className="
            text-accent-yellow 
            font-heading 
            font-semibold 
            text-sm 
            mb-3
            leading-tight
          ">
            {subtitle}
          </p>
          
          <p className="
            text-white/85 
            font-body 
            leading-relaxed 
            text-sm
            mb-4
          ">
            {description}
          </p>
          
          {/* Mystery Element */}
          <div className="
            flex 
            items-center 
            text-white/70 
            text-xs 
            font-body
            font-medium
          ">
            <Lock className="w-3 h-3 mr-2 text-accent-yellow" />
            Details revealed to early subscribers
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileComingSoonCard;
