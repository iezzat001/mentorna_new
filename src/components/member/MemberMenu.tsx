
import React from 'react';
import { User, BookOpen, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MemberMenu = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Profile', action: () => navigate('/member/profile') },
    { icon: BookOpen, label: 'My Learning', action: () => navigate('/member/learning') },
    { icon: HelpCircle, label: 'Help & Support', action: () => navigate('/member/help') },
  ];

  return (
    <div className="flex flex-col h-full py-6">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-black uppercase mb-2">
          MENU
        </h2>
        <p className="font-body text-sm text-foreground/70">
          Welcome back, {user?.user_metadata?.full_name || user?.email}
        </p>
      </div>

      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className="
                w-full 
                flex 
                items-center 
                gap-4 
                p-4 
                text-left 
                rounded-xl 
                border-2 
                border-transparent
                hover:border-foreground 
                hover:bg-accent-yellow/20 
                transition-all
              "
            >
              <Icon className="w-5 h-5 text-foreground" />
              <span className="font-body font-semibold text-foreground">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <Button
          onClick={handleSignOut}
          variant="destructive"
          className="
            w-full 
            border-4 
            border-foreground 
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
            font-black 
            uppercase
            hover:translate-x-1 
            hover:translate-y-1 
            hover:shadow-none
          "
        >
          <LogOut className="w-4 h-4 mr-2" />
          SIGN OUT
        </Button>
      </div>
    </div>
  );
};

export default MemberMenu;
