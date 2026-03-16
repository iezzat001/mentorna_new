import React from 'react';

interface MobileSwipeIndicatorProps {
  isEnd?: boolean;
  color?: 'light' | 'dark';
}

const MobileSwipeIndicator = ({ isEnd = false, color = 'light' }: MobileSwipeIndicatorProps) => {
  const colorClasses = color === 'light' ? 'text-white/70' : 'text-foreground/70';
  const barClasses = color === 'light' ? 'bg-white/50' : 'bg-foreground/50';

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex flex-col items-center">
        <div className={`w-1 h-6 ${barClasses} rounded-full ${!isEnd ? 'animate-pulse' : ''}`} />
        <span className={`${colorClasses} text-xs mt-1`}>
          {isEnd ? 'End' : 'Swipe up'}
        </span>
      </div>
    </div>
  );
};

export default MobileSwipeIndicator;