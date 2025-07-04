
import React from 'react';
import { Lock, LucideIcon } from 'lucide-react';

interface ProgramCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  delay: string;
}

const ProgramCard = ({ title, subtitle, description, icon: Icon, gradient, delay }: ProgramCardProps) => {
  return (
    <div
      className="
        group 
        relative 
        bg-gradient-to-br from-white/8 to-white/4
        backdrop-blur-md 
        border 
        border-white/20 
        rounded-3xl 
        p-8 
        hover:bg-gradient-to-br hover:from-white/15 hover:to-white/8
        hover:border-white/40 
        transition-all 
        duration-700 
        hover:scale-[1.03]
        hover:shadow-2xl
        hover:shadow-white/20
        animate-fade-in
        h-full
        flex
        flex-col
        overflow-hidden
      "
      style={{ 
        animationDelay: delay,
        animationFillMode: 'both'
      }}
    >
      {/* Enhanced Gradient Overlay with blur effect */}
      <div className={`
        absolute 
        inset-0 
        bg-gradient-to-br 
        ${gradient} 
        opacity-0 
        group-hover:opacity-10 
        rounded-3xl 
        transition-all
        duration-700
        blur-sm
      `} />
      
      {/* Subtle inner glow */}
      <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border effect */}
      <div className={`
        absolute inset-0 rounded-3xl 
        bg-gradient-to-r ${gradient}
        opacity-0 group-hover:opacity-20
        transition-opacity duration-500
        blur-[1px]
      `} style={{ clipPath: 'inset(0 round 1.5rem)' }} />
      
      {/* Enhanced Icon */}
      <div className="relative mb-6 z-10">
        <div className={`
          w-24 
          h-24 
          rounded-2xl 
          bg-gradient-to-br 
          ${gradient} 
          flex 
          items-center 
          justify-center 
          group-hover:scale-110 
          transition-all
          duration-500
          shadow-xl
          shadow-black/20
          group-hover:shadow-2xl
          relative
          overflow-hidden
        `}>
          {/* Icon glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 blur-md group-hover:opacity-70 transition-opacity duration-500`} />
          <Icon className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
        </div>
      </div>
      
      {/* Enhanced Content */}
      <div className="relative flex-1 flex flex-col z-10">
        <h3 className="
          text-2xl 
          md:text-3xl 
          font-heading 
          font-bold 
          text-white 
          mb-3
          group-hover:text-white
          transition-all
          duration-300
          leading-tight
        ">
          {title}
        </h3>
        
        <p className="
          text-accent-yellow 
          font-heading 
          font-semibold 
          text-lg 
          mb-6
          group-hover:text-accent-yellow/90
          transition-colors
          duration-300
        ">
          {subtitle}
        </p>
        
        <p className="
          text-white/85 
          font-body 
          leading-relaxed 
          mb-8
          flex-1
          text-base
          group-hover:text-white/95
          transition-colors
          duration-300
        ">
          {description}
        </p>
        
        {/* Enhanced Mystery Element */}
        <div className="
          flex 
          items-center 
          text-white/70 
          text-sm 
          font-body
          font-medium
          pt-6
          border-t
          border-white/20
          group-hover:border-white/30
          group-hover:text-white/80
          transition-all
          duration-300
        ">
          <Lock className="w-4 h-4 mr-3 text-accent-yellow group-hover:animate-pulse" />
          Details revealed to early subscribers
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
