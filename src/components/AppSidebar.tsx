
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCheck, 
  Mail, 
  BarChart3,
  Send
} from 'lucide-react';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'course-content',
      label: 'Course Content',
      icon: BookOpen,
    },
    {
      id: 'founders',
      label: 'Founders',
      icon: Users,
    },
    {
      id: 'waiting-list',
      label: 'Waiting List',
      icon: UserCheck,
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      icon: Mail,
    },
    {
      id: 'email-marketing',
      label: 'Email Marketing',
      icon: Send,
    },
    {
      id: 'tracking-analysis',
      label: 'Tracking & Analysis',
      icon: BarChart3,
    },
  ];

  return (
    <Sidebar className="border-r-4 border-foreground bg-accent-yellow">
      <SidebarHeader className="border-b-4 border-foreground bg-foreground p-4">
        <h2 className="font-heading text-xl font-black uppercase text-background">
          iLab® Admin
        </h2>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-heading font-black uppercase text-foreground/70 px-4 py-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className={`
                      font-body font-semibold text-foreground hover:bg-foreground/10 
                      data-[active=true]:bg-foreground data-[active=true]:text-background
                      data-[active=true]:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
                      transition-all duration-200
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-semibold">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t-4 border-foreground bg-foreground p-4">
        <p className="font-body text-sm font-medium text-background text-center">
          Admin Dashboard v1.0
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
