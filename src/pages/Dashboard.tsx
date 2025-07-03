
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users } from 'lucide-react';
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

const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
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
                  Content Management
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="space-y-2">
            <h1 className="font-heading text-4xl font-black uppercase text-foreground">
              Content Management
            </h1>
            <p className="font-body text-lg font-semibold text-foreground/70">
              Manage your platform content and settings
            </p>
          </div>

          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-green border-b-4 border-foreground">
              <CardTitle className="font-black text-2xl uppercase">
                Management Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="course-content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-accent-yellow border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <TabsTrigger 
                    value="course-content" 
                    className="font-black uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Course Content
                  </TabsTrigger>
                  <TabsTrigger 
                    value="founders" 
                    className="font-black uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Founders
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="course-content" className="space-y-4">
                  <CourseContentManager />
                </TabsContent>

                <TabsContent value="founders" className="space-y-4">
                  <FoundersManager />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
