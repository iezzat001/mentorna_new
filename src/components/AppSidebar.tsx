
import { BookOpen, Users, LogOut, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    id: 'dashboard',
  },
  {
    title: 'Course Content',
    icon: BookOpen,
    id: 'course-content',
  },
  {
    title: 'Founders',
    icon: Users,
    id: 'founders',
  },
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar className="border-r-4 border-foreground">
      <SidebarHeader className="border-b-4 border-foreground bg-accent-yellow p-4">
        <h2 className="font-heading text-lg font-black uppercase text-foreground">
          Admin Panel
        </h2>
        {user && (
          <p className="font-body text-xs font-medium text-foreground/70 truncate">
            {user.email}
          </p>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-black uppercase text-foreground">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                    className="
                      font-bold
                      data-[active=true]:bg-primary 
                      data-[active=true]:text-primary-foreground
                      data-[active=true]:border-2
                      data-[active=true]:border-foreground
                      data-[active=true]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                      hover:bg-accent-purple
                      hover:border-2
                      hover:border-foreground
                      hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                      transition-all
                    "
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-bold uppercase">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t-4 border-foreground bg-accent-green p-4">
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
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
            transition-all
          "
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
