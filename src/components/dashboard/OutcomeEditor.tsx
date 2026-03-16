
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
      // Check if this is a real database record (UUID format) or static data
      const isStaticData = outcome?.id?.startsWith('static-') || !outcome?.id;
      
      if (outcome && !isStaticData) {
        // Update existing database record
        const { error } = await supabase
          .from('week_outcomes')
          .update({ outcome_text: outcomeText })
          .eq('id', outcome.id);
        if (error) throw error;
      } else {
        // Create new record or replace static data
        // First check if a real record already exists
        const { data: existingOutcome } = await supabase
          .from('week_outcomes')
          .select('id')
          .eq('week_id', weekId)
          .maybeSingle();

        if (existingOutcome) {
          // Update existing record
          const { error } = await supabase
            .from('week_outcomes')
            .update({ outcome_text: outcomeText })
            .eq('id', existingOutcome.id);
          if (error) throw error;
        } else {
          // Create new record
          const { error } = await supabase
            .from('week_outcomes')
            .insert({ week_id: weekId, outcome_text: outcomeText });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-details', weekNumber] });
      queryClient.invalidateQueries({ queryKey: ['week-details-data', weekNumber] });
      toast.success('Outcome updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update outcome: ' + error.message);
    }
  });

  const handleSave = () => {
    if (outcomeText.trim()) {
      updateOutcomeMutation.mutate(outcomeText);
    }
  };

  const handleAutoSave = () => {
    if (outcomeText.trim() && outcomeText !== outcome?.outcome_text) {
      updateOutcomeMutation.mutate(outcomeText);
    }
  };

  return (
    <div>
      <Label className="font-bold text-sm uppercase mb-2 block">Learning Outcome</Label>
      <Textarea
        value={outcomeText}
        onChange={(e) => setOutcomeText(e.target.value)}
        onBlur={handleAutoSave}
        className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[150px]"
        placeholder="Describe what students will achieve by the end of this week..."
      />
      <Button 
        onClick={handleSave}
        disabled={updateOutcomeMutation.isPending}
        className="mt-2 bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        {updateOutcomeMutation.isPending ? 'Saving...' : 'Save Learning Outcome'}
      </Button>
    </div>
  );
};

export default OutcomeEditor;
