
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MemberMenu from './MemberMenu';

const MemberHeader = () => {
  const { user } = useAuth();
  
  // Get user's display name or email
  const displayName = user?.user_metadata?.full_name || user?.email || 'Member';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="
      fixed 
      top-0 
      left-0 
      right-0 
      z-50 
      bg-background 
      border-b-4 
      border-foreground 
      px-4 
      py-3
      shadow-[0_4px_0px_0px_rgba(0,0,0,1)]
    ">
      <div className="flex items-center justify-between">
        {/* User Profile Chip */}
        <div className="
          flex 
          items-center 
          gap-3 
          bg-accent-yellow 
          border-2 
          border-foreground 
          rounded-full 
          px-3 
          py-2
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ">
          <Avatar className="w-8 h-8 border-2 border-foreground">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-body font-semibold text-sm text-foreground">
            {displayName}
          </span>
        </div>

        {/* Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="
              w-12 
              h-12 
              bg-foreground 
              text-background 
              rounded-full 
              flex 
              items-center 
              justify-center
              border-2 
              border-foreground
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-1 
              hover:translate-y-1 
              hover:shadow-none 
              transition-all
            ">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-4 border-foreground">
            <MemberMenu />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MemberHeader;
