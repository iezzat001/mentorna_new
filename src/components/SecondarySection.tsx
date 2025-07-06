
import React from 'react';
import SimpleNewsletterForm from './SimpleNewsletterForm';

const SecondarySection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center px-8 py-16 relative overflow-hidden">
      {/* Subtle background elements for visual continuity */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-purple/20 to-accent-blue/15 rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-accent-yellow/15 to-accent-green/10 rounded-full blur-2xl animate-pulse opacity-25" style={{ animationDelay: '5s', animationDuration: '10s' }} />
      </div>

      <div className="text-center max-w-4xl space-y-12 relative z-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Join the AI Revolution
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-semibold leading-relaxed font-body max-w-3xl mx-auto">
            Get AI insights & early access
          </p>
        </div>
        
        {/* Newsletter Subscription Form */}
        <div className="pt-8">
          <SimpleNewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default SecondarySection;
