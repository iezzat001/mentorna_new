
import React from 'react';
import NewsletterForm from './NewsletterForm';

const SecondarySection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center px-8 py-16">
      <div className="text-center max-w-4xl space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Continue Your Journey
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-semibold leading-relaxed font-body max-w-3xl mx-auto">
            Stay Ahead of the AI Revolution
          </p>
          <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed font-body max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive AI insights, early bootcamp access, 
            and join our FREE upcoming webinar where you'll get a taste of our revolutionary 
            AI education approach!
          </p>
        </div>
        
        <div className="flex justify-center">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default SecondarySection;
