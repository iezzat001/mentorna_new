
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Edit2, Save, X as XCancel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSkillName, setEditSkillName] = useState('');

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

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { error } = await supabase
        .from('week_skills')
        .delete()
        .eq('id', skillId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Skill deleted successfully!');
    }
  });

  const updateSkillMutation = useMutation({
    mutationFn: async ({ skillId, skillName }: { skillId: string; skillName: string }) => {
      const { error } = await supabase
        .from('week_skills')
        .update({ skill_name: skillName })
        .eq('id', skillId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Skill updated successfully!');
      setEditingId(null);
      setEditSkillName('');
    }
  });

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditSkillName(skill.skill_name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSkillName('');
  };

  const saveEdit = (skillId: string) => {
    if (editSkillName.trim()) {
      updateSkillMutation.mutate({
        skillId,
        skillName: editSkillName.trim()
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-lg uppercase">Skills Gained</h3>
        <SkillAdder onAdd={(skill) => addSkillMutation.mutate(skill)} />
      </div>
      
      <div className="grid gap-2">
        {skills.map((skill) => (
          <div key={skill.id} className="p-2 bg-accent-yellow/20 border-2 border-foreground">
            {editingId === skill.id ? (
              // Edit mode
              <div className="space-y-2">
                <Input
                  value={editSkillName}
                  onChange={(e) => setEditSkillName(e.target.value)}
                  placeholder="Skill name"
                  className="font-semibold"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => saveEdit(skill.id)}
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
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm">{skill.skill_name}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(skill)}
                    className="p-1 hover:bg-blue-100 rounded transition-colors"
                    title="Edit skill"
                  >
                    <Edit2 className="h-4 w-4 text-blue-500" />
                  </button>
                  <button
                    onClick={() => deleteSkillMutation.mutate(skill.id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                    title="Delete skill"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
