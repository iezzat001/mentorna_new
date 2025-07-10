import React from 'react';
import {
  BarChart,
  BookOpen,
  Clock,
  Mail,
  MessageSquare,
  Send,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarClose, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      title: "Dashboard Overview",
      url: "dashboard",
      icon: BarChart,
    },
    {
      title: "Course Content",
      url: "course-content", 
      icon: BookOpen,
    },
    {
      title: "Founders",
      url: "founders",
      icon: Users,
    },
    {
      title: "Waiting List",
      url: "waiting-list",
      icon: Clock,
    },
    {
      title: "Newsletter",
      url: "newsletter", 
      icon: Mail,
    },
    {
      title: "Contact Messages",
      url: "contact-messages",
      icon: MessageSquare,
    },
    {
      title: "Email Marketing",
      url: "email-marketing",
      icon: Send,
    },
    {
      title: "Tracking & Analysis",
      url: "tracking-analysis",
      icon: TrendingUp,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent className="w-64 border-r bg-background border-foreground">
        <SidebarHeader className="font-bold text-2xl p-4 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Admin
          <SidebarClose className="ml-auto" />
        </SidebarHeader>
        <Separator className="bg-foreground" />
        {menuItems.map((item) => (
          <SidebarItem
            key={item.url}
            title={item.title}
            active={activeTab === item.url}
            onClick={() => onTabChange(item.url)}
            icon={item.icon}
            url={item.url}
          />
        ))}
        <Separator className="bg-foreground" />
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            Sign Out
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
