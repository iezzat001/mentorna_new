import React from 'react';
import SimpleNewsletterForm from '../SimpleNewsletterForm';

const MobileNewsletterSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Mobile Header */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-[calc(100vh-8rem)] px-4 max-w-sm mx-auto">
        {/* Main Heading - More Compact */}
        <div className="text-center mb-6 pt-8">
          <h2 className="text-white text-2xl font-black uppercase mb-2 leading-tight">
            Join the AI
            <span className="block text-accent-yellow">Revolution</span>
          </h2>
          <p className="text-white/80 text-sm font-medium leading-relaxed">
            Get exclusive updates and early access
          </p>
        </div>

        {/* Benefits - More Compact */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-center text-white/90 text-sm font-medium">
            <span className="text-accent-green mr-3">✓</span>
            <span>Weekly AI insights</span>
          </div>
          <div className="flex items-center justify-center text-white/90 text-sm font-medium">
            <span className="text-accent-green mr-3">✓</span>
            <span>Free webinar access</span>
          </div>
          <div className="flex items-center justify-center text-white/90 text-sm font-medium">
            <span className="text-accent-green mr-3">✓</span>
            <span>Priority notifications</span>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="flex-1 flex flex-col justify-center">
          <SimpleNewsletterForm />
        </div>

        {/* Bottom Section with Privacy & End Indicator */}
        <div className="flex-shrink-0 pb-4">
          <p className="text-white/50 text-xs text-center mb-4">
            No spam. Unsubscribe anytime. 🔒
          </p>
          
          {/* End indicator */}
          <div className="flex flex-col items-center">
            <div className="w-1 h-4 bg-white/30 rounded-full" />
            <span className="text-white/50 text-xs mt-1">End</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNewsletterSection;