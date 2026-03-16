
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import BasicInfoForm from './BasicInfoForm';
import OutcomeEditor from './OutcomeEditor';
import ActivitiesManager from './ActivitiesManager';
import SkillsManager from './SkillsManager';
import { weekDetailsData } from '@/data/weekDetailsData';

interface WeekEditorProps {
  weekNumber: number;
}

const WeekEditor = ({ weekNumber }: WeekEditorProps) => {
  // Fetch week data with all related content
  const { data: weekData, isLoading } = useQuery({
    queryKey: ['week-details', weekNumber],
    queryFn: async () => {
      const { data: week, error: weekError } = await supabase
        .from('weeks')
        .select('*')
        .eq('week_number', weekNumber)
        .single();

      if (weekError) throw weekError;

      const [activitiesRes, skillsRes, outcomesRes] = await Promise.all([
        supabase
          .from('week_activities')
          .select('*')
          .eq('week_id', week.id)
          .order('order_index'),
        supabase
          .from('week_skills')
          .select('*')
          .eq('week_id', week.id)
          .order('order_index'),
        supabase
          .from('week_outcomes')
          .select('*')
          .eq('week_id', week.id)
          .maybeSingle()
      ]);

      // Use static data as fallback if database is empty
      const staticData = weekDetailsData[weekNumber];
      
      return {
        week,
        activities: activitiesRes.data?.length > 0 ? activitiesRes.data : 
          staticData?.activities.map((activity, index) => ({
            id: `static-${index}`,
            week_id: week.id,
            activity_type: activity.type,
            title: activity.title,
            description: activity.description,
            duration: activity.duration,
            order_index: index
          })) || [],
        skills: skillsRes.data?.length > 0 ? skillsRes.data :
          staticData?.skills.map((skill, index) => ({
            id: `static-${index}`,
            week_id: week.id,
            skill_name: skill,
            order_index: index
          })) || [],
        outcome: outcomesRes.data || 
          (staticData ? {
            id: 'static-outcome',
            week_id: week.id,
            outcome_text: staticData.outcome
          } : null)
      };
    }
  });

  if (isLoading) {
    return (
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="font-semibold">Loading week data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!weekData) {
    return (
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-12 text-center">
          <p className="font-semibold">Week data not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-green border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase">
          EDIT WEEK {weekNumber}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic" className="font-bold">Basic Info</TabsTrigger>
            <TabsTrigger value="outcome" className="font-bold">Outcome</TabsTrigger>
            <TabsTrigger value="activities" className="font-bold">Activities</TabsTrigger>
            <TabsTrigger value="skills" className="font-bold">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <BasicInfoForm weekData={weekData.week} weekNumber={weekNumber} />
          </TabsContent>

          <TabsContent value="outcome" className="space-y-4">
            <OutcomeEditor 
              weekId={weekData.week.id} 
              weekNumber={weekNumber} 
              outcome={weekData.outcome} 
            />
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <ActivitiesManager 
              weekId={weekData.week.id} 
              weekNumber={weekNumber} 
              activities={weekData.activities}
              activitiesVisible={weekData.week.activities_visible}
            />
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <SkillsManager 
              weekId={weekData.week.id} 
              weekNumber={weekNumber} 
              skills={weekData.skills} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeekEditor;
