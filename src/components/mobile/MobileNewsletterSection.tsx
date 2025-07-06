
import React from 'react';
import SimpleNewsletterForm from '../SimpleNewsletterForm';

const MobileNewsletterSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 rounded-full blur-3xl animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-green/25 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-40" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full justify-center px-6 py-16 max-w-lg mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h2 className="
            text-4xl 
            font-heading 
            font-light 
            text-white 
            mb-4 
            leading-tight
          ">
            Stay Ahead of the
            <span className="block text-accent-yellow font-medium">
              AI Revolution
            </span>
          </h2>
        </div>

        {/* Enhanced OPT-IN messaging */}
        <div className="
          bg-accent-yellow/10 
          border-2 
          border-accent-yellow/30 
          rounded-2xl 
          p-6 
          mb-8
          backdrop-blur-sm
        ">
          <div className="flex items-center justify-center mb-4">
            <div className="
              bg-accent-yellow 
              text-black 
              px-3 
              py-1 
              rounded-full 
              font-black 
              text-xs 
              uppercase 
              tracking-wide
            ">
              🎯 Exclusive Access
            </div>
          </div>
          
          <h3 className="
            text-white 
            font-heading 
            font-semibold 
            text-lg 
            mb-4
          ">
            What You'll Get:
          </h3>
          
          <div className="space-y-3 text-white/90 text-sm font-medium">
            <div className="flex items-center justify-start">
              <span className="text-accent-green mr-3">✓</span>
              <span>Weekly AI insights & breakthrough updates</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-accent-green mr-3">✓</span>
              <span>Early access to FREE webinar sessions</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-accent-green mr-3">✓</span>
              <span>Exclusive parent community invitations</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-accent-green mr-3">✓</span>
              <span>Priority notifications for program launches</span>
            </div>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="mb-6">
          <SimpleNewsletterForm />
        </div>

        {/* Privacy & OPT-IN messaging */}
        <div className="space-y-3 text-white/60 text-xs leading-relaxed">
          <p className="flex items-center justify-center gap-2">
            <span className="text-accent-green">🔒</span>
            <span>Your privacy is our priority. Unsubscribe anytime.</span>
          </p>
          <p>
            By subscribing, you're opting in to receive valuable AI education insights, 
            webinar invitations, and program updates. We respect your inbox and only 
            send content that helps prepare your child for the AI-powered future.
          </p>
          <p className="font-medium text-white/80">
            No spam. No daily emails. Just pure value. 🚀
          </p>
        </div>
      </div>

      {/* Swipe indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-1 h-6 bg-white/30 rounded-full" />
        <span className="text-white/50 text-xs mt-1">End of journey</span>
      </div>
    </div>
  );
};

export default MobileNewsletterSection;
