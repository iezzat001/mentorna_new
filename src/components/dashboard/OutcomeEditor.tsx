
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OutcomeEditorProps {
  weekId: string;
  weekNumber: number;
  outcome?: {
    id: string;
    outcome_text: string;
  };
}

const OutcomeEditor = ({ weekId, weekNumber, outcome }: OutcomeEditorProps) => {
  const queryClient = useQueryClient();
  const [outcomeText, setOutcomeText] = useState(outcome?.outcome_text || '');

  const updateOutcomeMutation = useMutation({
    mutationFn: async (outcomeText: string) => {
      if (outcome) {
        const { error } = await supabase
          .from('week_outcomes')
          .update({ outcome_text: outcomeText })
          .eq('id', outcome.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('week_outcomes')
          .insert({ week_id: weekId, outcome_text: outcomeText });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      toast.success('Outcome updated successfully!');
    }
  });

  const handleSave = () => {
    if (outcomeText.trim()) {
      updateOutcomeMutation.mutate(outcomeText);
    }
  };

  return (
    <div>
      <Label className="font-bold text-sm uppercase mb-2 block">Learning Outcome</Label>
      <Textarea
        value={outcomeText}
        onChange={(e) => setOutcomeText(e.target.value)}
        onBlur={() => updateOutcomeMutation.mutate(outcomeText)}
        className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[150px]"
        placeholder="Describe what students will achieve by the end of this week..."
      />
      <Button 
        onClick={handleSave}
        disabled={updateOutcomeMutation.isPending}
        className="mt-2"
      >
        {updateOutcomeMutation.isPending ? 'Saving...' : 'Save Learning Outcome'}
      </Button>
    </div>
  );
};

export default OutcomeEditor;
