
import React from 'react';

const ComingSoonBackground = () => {
  return (
    <>
      {/* Multi-layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-green/25 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '6s', animationDuration: '12s' }} />
        
        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-accent-yellow/20 to-accent-purple/15 rounded-full blur-2xl animate-pulse opacity-30" style={{ animationDelay: '3s', animationDuration: '10s' }} />
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-tr from-accent-blue/25 to-accent-green/15 rounded-full blur-2xl animate-pulse opacity-35" style={{ animationDelay: '9s', animationDuration: '14s' }} />
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent-yellow rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent-blue rounded-full" />
        </div>
      </div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
    </>
  );
};

export default ComingSoonBackground;
