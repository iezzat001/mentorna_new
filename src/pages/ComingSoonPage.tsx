import React from 'react';
import { Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background - matching EXCLUSIVE ACCESS section */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-green/25 to-orange-500/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '6s', animationDuration: '12s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <Badge className="
          bg-foreground/10 
          text-white 
          border-white/20 
          font-heading 
          font-bold 
          text-sm 
          px-4 
          py-2 
          mb-8
          hover:bg-foreground/20
          transition-colors
          duration-300
        ">
          <Lock className="w-4 h-4 mr-2" />
          EXCLUSIVE ACCESS
        </Badge>
        
        <h1 className="
          text-6xl 
          md:text-7xl 
          lg:text-8xl 
          font-heading 
          font-light 
          text-white 
          mb-6 
          leading-none
        ">
          Coming Soon
        </h1>
      </div>
    </div>
  );
};

export default ComingSoonPage;
