
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
    staleTime: 0, // Always fetch fresh data
    gcTime: 0  // Don't cache the data
  });
};

export const useWeekDetails = (weekNumber: number) => {
  return useQuery({
    queryKey: ['week-details-data', weekNumber],
    queryFn: async (): Promise<WeekDetailsData> => {
      console.log('Fetching week details for week:', weekNumber);
      
      // First get the week ID
      const { data: week, error: weekError } = await supabase
        .from('weeks')
        .select('id')
        .eq('week_number', weekNumber)
        .single();
      
      if (weekError) throw weekError;
      if (!week) throw new Error(`Week ${weekNumber} not found`);

      console.log('Week ID found:', week.id);

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

      console.log('Week details fetched:', {
        outcome: outcomeRes.data?.outcome_text,
        activitiesCount: activitiesRes.data?.length,
        skillsCount: skillsRes.data?.length
      });

      return {
        outcome: outcomeRes.data?.outcome_text || '',
        activities: activitiesRes.data?.map(activity => ({
          type: activity.activity_type as any,
          title: activity.title,
          description: activity.description,
          duration: activity.duration
        })) || [],
        skills: skillsRes.data?.map(skill => skill.skill_name) || []
      };
    },
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache the data
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
