
import React from 'react';
import MemberHeader from './MemberHeader';
import MemberBottomNav from './MemberBottomNav';

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout = ({ children }: MemberLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed Header */}
      <MemberHeader />
      
      {/* Scrollable Main Content Area */}
      <main className="
        pt-20 
        pb-24 
        px-4 
        overflow-y-auto 
        min-h-screen
        flex 
        flex-col 
        gap-6
      ">
        {children}
      </main>
      
      {/* Floating Bottom Navigation */}
      <MemberBottomNav />
    </div>
  );
};

export default MemberLayout;
