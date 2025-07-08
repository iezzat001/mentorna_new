
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { weekDetailsData } from '@/data/weekDetailsData';

export interface WeekData {
  week: number;
  title: string;
  description: string;
  phase: string;
}

export interface WeekDetailsData {
  outcome: string;
  activities: Array<{
    type: 'assignment' | 'workshop' | 'seminar' | 'project';
    title: string;
    description: string;
    duration: string;
  }>;
  skills: string[];
  activitiesVisible: boolean;
}

export const useWeeksData = () => {
  return useQuery({
    queryKey: ['weeks-data'],
    queryFn: async (): Promise<WeekData[]> => {
      const { data: weeks, error } = await supabase
        .from('weeks')
        .select('*')
        .order('week_number');
      
      if (error) throw error;
      
      return weeks.map(week => ({
        week: week.week_number,
        title: week.title,
        description: week.description,
        phase: week.phase
      }));
    },
    staleTime: 0, // Force fresh data
    gcTime: 0  // Don't cache the data (updated from cacheTime)
  });
};

export const useWeekDetails = (weekNumber: number) => {
  return useQuery({
    queryKey: ['week-details-data', weekNumber],
    queryFn: async (): Promise<WeekDetailsData> => {
      // First get the week ID and activities_visible
      const { data: week, error: weekError } = await supabase
        .from('weeks')
        .select('id, activities_visible')
        .eq('week_number', weekNumber)
        .single();
      
      if (weekError) throw weekError;
      if (!week) throw new Error(`Week ${weekNumber} not found`);

      // Get all related data
      const [activitiesRes, skillsRes, outcomeRes] = await Promise.all([
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

      if (activitiesRes.error) throw activitiesRes.error;
      if (skillsRes.error) throw skillsRes.error;
      if (outcomeRes.error) throw outcomeRes.error;

      // Use static data as fallback if database is empty
      const staticData = weekDetailsData[weekNumber];
      
      return {
        outcome: outcomeRes.data?.outcome_text || staticData?.outcome || '',
        activities: activitiesRes.data?.length > 0 ? activitiesRes.data.map(activity => ({
          type: activity.activity_type as any,
          title: activity.title,
          description: activity.description,
          duration: activity.duration
        })) : staticData?.activities || [],
        skills: skillsRes.data?.length > 0 ? skillsRes.data.map(skill => skill.skill_name) : staticData?.skills || [],
        activitiesVisible: week.activities_visible ?? true
      };
    },
    staleTime: 0, // Force fresh data
    gcTime: 0, // Don't cache the data (updated from cacheTime)
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
