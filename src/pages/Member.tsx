
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MemberLayout from '@/components/member/MemberLayout';
import UpcomingConsultationCard from '@/components/member/UpcomingConsultationCard';
import DoctorFinderSection from '@/components/member/DoctorFinderSection';

const Member = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="
          bg-accent-yellow 
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          p-8
        ">
          <h2 className="font-heading text-2xl font-black uppercase">
            LOADING...
          </h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="
          bg-red-100 
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          p-8 
          text-center
          max-w-md
        ">
          <h2 className="font-heading text-2xl font-black uppercase mb-4 text-red-600">
            ACCESS DENIED
          </h2>
          <p className="font-body text-lg font-semibold">
            Please log in to access the member area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <MemberLayout>
      <UpcomingConsultationCard />
      <DoctorFinderSection />
    </MemberLayout>
  );
};

export default Member;
