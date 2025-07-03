
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Save, Loader2 } from 'lucide-react';
import WeekEditor from '@/components/dashboard/WeekEditor';
import { toast } from 'sonner';

const Dashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch all weeks
  const { data: weeks, isLoading } = useQuery({
    queryKey: ['weeks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('weeks')
        .select('*')
        .order('week_number');
      
      if (error) throw error;
      return data;
    }
  });

  const handleWeekSelect = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-semibold">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground mb-2">
            Course Content Dashboard
          </h1>
          <p className="font-body text-lg font-semibold text-foreground/70">
            Manage your 8-week entrepreneurship program content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Week List */}
          <div className="lg:col-span-1">
            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="bg-accent-purple border-b-4 border-foreground">
                <CardTitle className="font-black text-xl uppercase">
                  Program Weeks
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {weeks?.map((week) => (
                    <Button
                      key={week.id}
                      variant={selectedWeek === week.week_number ? "default" : "outline"}
                      className={`
                        w-full justify-start h-auto p-3 
                        border-2 border-foreground 
                        ${selectedWeek === week.week_number 
                          ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                          : 'bg-white hover:bg-accent-yellow/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        }
                        hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all
                      `}
                      onClick={() => handleWeekSelect(week.week_number)}
                    >
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-sm">WEEK {week.week_number}</span>
                          <Badge className="bg-foreground text-background font-black text-xs">
                            {week.phase === 'Foundation Building' ? 'PHASE I' : 'PHASE II'}
                          </Badge>
                        </div>
                        <div className="font-bold text-xs uppercase leading-tight">
                          {week.title}
                        </div>
                      </div>
                      <Edit className="h-4 w-4 ml-2" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Week Editor */}
          <div className="lg:col-span-2">
            {selectedWeek ? (
              <WeekEditor weekNumber={selectedWeek} />
            ) : (
              <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="font-black text-2xl uppercase mb-2">
                    Select a Week to Edit
                  </h3>
                  <p className="font-body text-base font-semibold text-foreground/70">
                    Choose a week from the list to start editing its content
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
