
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, X, Edit2, Save, X as XCancel, Eye, EyeOff } from 'lucide-react';
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
  activitiesVisible: boolean;
}

const ActivitiesManager = ({ weekId, weekNumber, activities, activitiesVisible }: ActivitiesManagerProps) => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    activity_type: '',
    title: '',
    description: '',
    duration: ''
  });

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

  const deleteActivityMutation = useMutation({
    mutationFn: async (activityId: string) => {
      const { error } = await supabase
        .from('week_activities')
        .delete()
        .eq('id', activityId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Activity deleted successfully!');
    }
  });

  const updateActivityMutation = useMutation({
    mutationFn: async ({ activityId, updates }: { activityId: string; updates: any }) => {
      const { error } = await supabase
        .from('week_activities')
        .update(updates)
        .eq('id', activityId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Activity updated successfully!');
      setEditingId(null);
    }
  });

  const startEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setEditForm({
      activity_type: activity.activity_type,
      title: activity.title,
      description: activity.description,
      duration: activity.duration
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      activity_type: '',
      title: '',
      description: '',
      duration: ''
    });
  };

  const saveEdit = (activityId: string) => {
    updateActivityMutation.mutate({
      activityId,
      updates: editForm
    });
  };

  const toggleVisibilityMutation = useMutation({
    mutationFn: async (visible: boolean) => {
      const { error } = await supabase
        .from('weeks')
        .update({ activities_visible: visible })
        .eq('id', weekId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success(`Activities section ${activitiesVisible ? 'hidden' : 'shown'} on frontend`);
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-lg uppercase">Weekly Activities</h3>
        <div className="flex items-center gap-4">
          <ActivityAdder onAdd={(activity) => addActivityMutation.mutate(activity)} />
        </div>
      </div>

      {/* Visibility Toggle */}
      <div className="
        bg-accent-yellow/20 
        border-2 
        border-foreground 
        p-4 
        rounded-lg
        flex 
        items-center 
        justify-between
      ">
        <div className="flex items-center gap-3">
          {activitiesVisible ? (
            <Eye className="h-5 w-5 text-green-600" />
          ) : (
            <EyeOff className="h-5 w-5 text-red-600" />
          )}
          <div>
            <div className="font-black text-sm uppercase">
              Frontend Visibility
            </div>
            <div className="text-xs text-foreground/70">
              {activitiesVisible 
                ? "Activities section is visible on / and /mobile pages" 
                : "Activities section is hidden from / and /mobile pages"
              }
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">
            {activitiesVisible ? 'Show' : 'Hide'}
          </span>
          <Switch
            checked={activitiesVisible}
            onCheckedChange={(checked) => toggleVisibilityMutation.mutate(checked)}
            disabled={toggleVisibilityMutation.isPending}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-4">
              {editingId === activity.id ? (
                // Edit mode
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Select value={editForm.activity_type} onValueChange={(value) => setEditForm({...editForm, activity_type: value})}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={editForm.duration}
                      onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                      placeholder="Duration"
                      className="w-24"
                    />
                  </div>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    placeholder="Activity title"
                    className="font-black"
                  />
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Activity description"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => saveEdit(activity.id)}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      onClick={cancelEdit}
                      size="sm"
                      variant="outline"
                    >
                      <XCancel className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode
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
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(activity)}
                      className="p-1 hover:bg-blue-100 rounded transition-colors"
                      title="Edit activity"
                    >
                      <Edit2 className="h-4 w-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => deleteActivityMutation.mutate(activity.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Delete activity"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesManager;
