
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import CourseContentManager from '@/components/dashboard/CourseContentManager';
import FoundersManager from '@/components/dashboard/FoundersManager';
import WaitingListManager from '@/components/dashboard/WaitingListManager';
import NewsletterManager from '@/components/dashboard/NewsletterManager';
import TrackingAnalysisManager from '@/components/dashboard/TrackingAnalysisManager';
import { migrateWeekData } from '@/utils/migrateWeekData';
import { toast } from 'sonner';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigrateWeekData = async () => {
    setIsMigrating(true);
    try {
      const success = await migrateWeekData();
      if (success) {
        toast.success('Week data migrated successfully! All detailed content has been restored.');
      } else {
        toast.error('Migration failed. Please check the console for details.');
      }
    } catch (error) {
      toast.error('Migration failed: ' + (error as Error).message);
    } finally {
      setIsMigrating(false);
    }
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'course-content':
        return 'Course Content Management';
      case 'founders':
        return 'Founders Management';
      case 'waiting-list':
        return 'Waiting List Management';
      case 'newsletter':
        return 'Newsletter Management';
      case 'tracking-analysis':
        return 'Tracking & Analysis Management';
      default:
        return 'Dashboard Overview';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'course-content':
        return <CourseContentManager />;
      case 'founders':
        return <FoundersManager />;
      case 'waiting-list':
        return <WaitingListManager />;
      case 'newsletter':
        return <NewsletterManager />;
      case 'tracking-analysis':
        return <TrackingAnalysisManager />;
      default:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="font-heading text-4xl font-black uppercase text-foreground">
                Dashboard Overview
              </h1>
              <p className="font-body text-lg font-semibold text-foreground/70">
                Welcome to your admin dashboard
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="bg-accent-purple border-b-4 border-foreground">
                  <CardTitle className="font-black text-2xl uppercase">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="font-body text-lg font-semibold">
                      Use the sidebar to navigate between different management sections.
                    </p>
                    <div className="pt-4 border-t-2 border-foreground">
                      <h4 className="font-black text-sm uppercase mb-2">Data Management</h4>
                      <Button
                        onClick={handleMigrateWeekData}
                        disabled={isMigrating}
                        className="w-full bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        {isMigrating ? 'Migrating...' : 'Restore Detailed Week Content'}
                      </Button>
                      <p className="text-xs font-semibold text-foreground/70 mt-2">
                        This will restore all detailed weekly activities, outcomes, and skills from the original content.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="bg-accent-green border-b-4 border-foreground">
                  <CardTitle className="font-black text-2xl uppercase">
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="font-body text-lg font-semibold text-green-600">
                    All systems operational
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b-4 border-foreground bg-accent-yellow px-4">
          <SidebarTrigger className="-ml-1 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-1 bg-foreground"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink 
                  href="#" 
                  className="font-black uppercase text-foreground hover:text-primary"
                >
                  Admin Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-black uppercase text-foreground">
                  {getBreadcrumbTitle()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
