
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import SkillAdder from './SkillAdder';

interface Skill {
  id: string;
  skill_name: string;
  order_index: number;
}

interface SkillsManagerProps {
  weekId: string;
  weekNumber: number;
  skills: Skill[];
}

const SkillsManager = ({ weekId, weekNumber, skills }: SkillsManagerProps) => {
  const queryClient = useQueryClient();

  const addSkillMutation = useMutation({
    mutationFn: async (skillName: string) => {
      const { error } = await supabase
        .from('week_skills')
        .insert({
          week_id: weekId,
          skill_name: skillName,
          order_index: skills.length || 0
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Skill added successfully!');
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-lg uppercase">Skills Gained</h3>
        <SkillAdder onAdd={(skill) => addSkillMutation.mutate(skill)} />
      </div>
      
      <div className="grid gap-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 p-2 bg-accent-yellow/20 border-2 border-foreground">
            <span className="font-semibold text-sm">{skill.skill_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
