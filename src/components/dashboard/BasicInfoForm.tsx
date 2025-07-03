
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BasicInfoFormProps {
  weekData: {
    id: string;
    title: string;
    description: string;
    phase: 'Foundation Building' | 'Advanced Implementation';
  };
  weekNumber: number;
}

const BasicInfoForm = ({ weekData, weekNumber }: BasicInfoFormProps) => {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: weekData.title,
    description: weekData.description,
    phase: weekData.phase
  });

  const updateWeekMutation = useMutation({
    mutationFn: async (updates: { title: string; description: string; phase: 'Foundation Building' | 'Advanced Implementation' }) => {
      const { error } = await supabase
        .from('weeks')
        .update(updates)
        .eq('id', weekData.id);
      
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};

export default BasicInfoForm;
