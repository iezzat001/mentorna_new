
import React from 'react';

const PhaseSwipeIndicator = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex flex-col items-center">
        <div className="w-1 h-8 bg-foreground/50 rounded-full animate-pulse" />
        <span className="text-foreground/70 text-xs mt-1">Swipe up</span>
      </div>
    </div>
  );
};

export default PhaseSwipeIndicator;
