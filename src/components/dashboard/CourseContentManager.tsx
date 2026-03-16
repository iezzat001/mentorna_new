
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Loader2 } from 'lucide-react';
import WeekEditor from './WeekEditor';

const CourseContentManager = () => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

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

  const handleBack = () => {
    setSelectedWeek(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2 font-semibold">Loading Course Content...</span>
      </div>
    );
  }

  if (selectedWeek) {
    return (
      <div className="space-y-4">
        <Button
          onClick={handleBack}
          variant="outline"
          className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          ← Back to Course Overview
        </Button>
        <WeekEditor weekNumber={selectedWeek} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-3xl font-black uppercase">Manage Course Content</h2>
      
      <div className="grid gap-4">
        {weeks?.map((week) => (
          <Card key={week.id} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-purple border-b-4 border-foreground">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="font-black text-xl uppercase">
                    WEEK {week.week_number}: {week.title}
                  </CardTitle>
                  <p className="font-semibold text-sm mt-1">{week.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-foreground text-background font-black text-xs">
                    {week.phase === 'Foundation Building' ? 'PHASE I' : 'PHASE II'}
                  </Badge>
                  <Button
                    onClick={() => handleWeekSelect(week.week_number)}
                    className="bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseContentManager;
