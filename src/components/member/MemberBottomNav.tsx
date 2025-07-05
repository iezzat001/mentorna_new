
import React from 'react';
import { Home, Calendar, Users, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const MemberBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/member' },
    { icon: Calendar, label: 'Schedule', path: '/member/schedule' },
    { icon: Users, label: 'Community', path: '/member/community' },
    { icon: Settings, label: 'Settings', path: '/member/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="
      fixed 
      bottom-4 
      left-1/2 
      transform 
      -translate-x-1/2 
      z-50
    ">
      <div className="
        bg-background 
        border-4 
        border-foreground 
        rounded-full 
        px-6 
        py-3
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        flex 
        items-center 
        gap-6
      ">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                relative 
                p-3 
                rounded-xl 
                transition-all
                ${active 
                  ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'text-foreground hover:bg-accent-yellow/30'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MemberBottomNav;
