
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface WeekEditorProps {
  weekNumber: number;
}

const WeekEditor = ({ weekNumber }: WeekEditorProps) => {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    phase: 'Foundation Building' as 'Foundation Building' | 'Advanced Implementation'
  });

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
          .single()
      ]);

      // Set form data when week data is loaded
      setFormData({
        title: week.title,
        description: week.description,
        phase: week.phase as 'Foundation Building' | 'Advanced Implementation'
      });

      return {
        week,
        activities: activitiesRes.data || [],
        skills: skillsRes.data || [],
        outcome: outcomesRes.data
      };
    }
  });

  // Update week basic info
  const updateWeekMutation = useMutation({
    mutationFn: async (updates: { title: string; description: string; phase: 'Foundation Building' | 'Advanced Implementation' }) => {
      const { error } = await supabase
        .from('weeks')
        .update(updates)
        .eq('id', weekData?.week.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weeks'] });
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Week updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update week: ' + error.message);
    }
  });

  // Update outcome
  const updateOutcomeMutation = useMutation({
    mutationFn: async (outcomeText: string) => {
      if (weekData?.outcome) {
        const { error } = await supabase
          .from('week_outcomes')
          .update({ outcome_text: outcomeText })
          .eq('id', weekData.outcome.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('week_outcomes')
          .insert({ week_id: weekData?.week.id, outcome_text: outcomeText });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Outcome updated successfully!');
    }
  });

  // Add activity
  const addActivityMutation = useMutation({
    mutationFn: async (activity: { type: string; title: string; description: string; duration: string }) => {
      const { error } = await supabase
        .from('week_activities')
        .insert({
          week_id: weekData?.week.id,
          activity_type: activity.type as any,
          title: activity.title,
          description: activity.description,
          duration: activity.duration,
          order_index: weekData?.activities.length || 0
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Activity added successfully!');
    }
  });

  // Add skill
  const addSkillMutation = useMutation({
    mutationFn: async (skillName: string) => {
      const { error } = await supabase
        .from('week_skills')
        .insert({
          week_id: weekData?.week.id,
          skill_name: skillName,
          order_index: weekData?.skills.length || 0
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Skill added successfully!');
    }
  });

  const handleSaveWeek = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateWeekMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        phase: formData.phase,
      });
    } finally {
      setIsSaving(false);
    }
  };

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

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <form onSubmit={handleSaveWeek} className="space-y-4">
              <div>
                <Label className="font-bold text-sm uppercase mb-2 block">Week Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                />
              </div>
              
              <div>
                <Label className="font-bold text-sm uppercase mb-2 block">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[100px]"
                />
              </div>
              
              <div>
                <Label className="font-bold text-sm uppercase mb-2 block">Phase</Label>
                <Select value={formData.phase} onValueChange={(value: 'Foundation Building' | 'Advanced Implementation') => setFormData({...formData, phase: value})}>
                  <SelectTrigger className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Foundation Building">Foundation Building</SelectItem>
                    <SelectItem value="Advanced Implementation">Advanced Implementation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-primary border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </form>
          </TabsContent>

          {/* Outcome Tab */}
          <TabsContent value="outcome" className="space-y-4">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Learning Outcome</Label>
              <Textarea
                defaultValue={weekData?.outcome?.outcome_text}
                onBlur={(e) => updateOutcomeMutation.mutate(e.target.value)}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[150px]"
                placeholder="Describe what students will achieve by the end of this week..."
              />
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-lg uppercase">Weekly Activities</h3>
              <ActivityAdder onAdd={(activity) => addActivityMutation.mutate(activity)} />
            </div>
            
            <div className="space-y-3">
              {weekData?.activities.map((activity, index) => (
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
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-lg uppercase">Skills Gained</h3>
              <SkillAdder onAdd={(skill) => addSkillMutation.mutate(skill)} />
            </div>
            
            <div className="grid gap-2">
              {weekData?.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 p-2 bg-accent-yellow/20 border-2 border-foreground">
                  <span className="font-semibold text-sm">{skill.skill_name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Activity Adder Component
const ActivityAdder = ({ onAdd }: { onAdd: (activity: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'workshop',
    title: '',
    description: '',
    duration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ type: 'workshop', title: '', description: '', duration: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-accent-yellow border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Activity
      </Button>
    );
  }

  return (
    <Card className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger className="border-2 border-foreground">
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
            placeholder="Activity title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="border-2 border-foreground"
          />
          
          <Textarea
            placeholder="Activity description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border-2 border-foreground"
          />
          
          <Input
            placeholder="Duration (e.g., 2 hours)"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="border-2 border-foreground"
          />
          
          <div className="flex gap-2">
            <Button type="submit" className="bg-primary border-2 border-foreground font-black text-xs">
              Add
            </Button>
            <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="border-2 border-foreground font-black text-xs">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Skill Adder Component
const SkillAdder = ({ onAdd }: { onAdd: (skill: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skillName, setSkillName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillName.trim()) {
      onAdd(skillName.trim());
      setSkillName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-accent-yellow border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Skill
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Enter skill name"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        className="border-2 border-foreground"
      />
      <Button type="submit" className="bg-primary border-2 border-foreground font-black text-xs">
        Add
      </Button>
      <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="border-2 border-foreground font-black text-xs">
        Cancel
      </Button>
    </form>
  );
};

export default WeekEditor;
