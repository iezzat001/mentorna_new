
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import ActivityAdder from './ActivityAdder';

interface Activity {
  id: string;
  activity_type: string;
  title: string;
  description: string;
  duration: string;
  order_index: number;
}

interface ActivitiesManagerProps {
  weekId: string;
  weekNumber: number;
  activities: Activity[];
}

const ActivitiesManager = ({ weekId, weekNumber, activities }: ActivitiesManagerProps) => {
  const queryClient = useQueryClient();

  const addActivityMutation = useMutation({
    mutationFn: async (activity: { type: string; title: string; description: string; duration: string }) => {
      const { error } = await supabase
        .from('week_activities')
        .insert({
          week_id: weekId,
          activity_type: activity.type as any,
          title: activity.title,
          description: activity.description,
          duration: activity.duration,
          order_index: activities.length || 0
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Activity added successfully!');
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-lg uppercase">Weekly Activities</h3>
        <ActivityAdder onAdd={(activity) => addActivityMutation.mutate(activity)} />
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <Card key={activity.id} className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-foreground/50 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-foreground text-background font-black text-xs">
                      {activity.activity_type}
                    </Badge>
                    <span className="text-xs font-semibold">{activity.duration}</span>
                  </div>
                  <h4 className="font-black text-sm uppercase mb-1">{activity.title}</h4>
                  <p className="text-sm text-foreground/70">{activity.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesManager;
