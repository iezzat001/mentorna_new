
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users } from 'lucide-react';
import CourseContentManager from '@/components/dashboard/CourseContentManager';
import FoundersManager from '@/components/dashboard/FoundersManager';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="font-body text-lg font-semibold text-foreground/70">
            Manage your platform content and settings
          </p>
        </div>

        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-green border-b-4 border-foreground">
            <CardTitle className="font-black text-2xl uppercase">
              Content Management
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
    </div>
  );
};

export default Dashboard;
