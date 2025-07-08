import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Week1DataSeeder = () => {
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);

  const week1Data = {
    activities: [
      {
        activity_type: 'seminar',
        title: '🎯 EXECUTIVE PRESENTATION MASTERY',
        description: '"How Leaders Present Ideas That Win" - Your teen analyzes how successful leaders from Elon Musk to Oprah structure presentations that captivate audiences and drive action.',
        duration: '2 hours',
        order_index: 0
      },
      {
        activity_type: 'workshop',
        title: '🗣️ CONFIDENCE & COMMUNICATION WORKSHOP',
        description: '"From Shy to Confident: Master Any Room" - Transform stage fright into stage presence. Your teen develops compelling storytelling abilities and learns body language techniques used by TED speakers.',
        duration: '3 hours',
        order_index: 1
      },
      {
        activity_type: 'project',
        title: '💼 PROFESSIONAL PORTFOLIO PROJECT',
        description: '"Build Your First Executive Presentation" - Create a polished 10-slide presentation with professional visuals - the same format used in corporate boardrooms and university applications.',
        duration: '4 hours',
        order_index: 2
      },
      {
        activity_type: 'workshop',
        title: '🏆 LEADERSHIP SHOWCASE',
        description: '"Present Like a Pro to Real Mentors" - Practice presenting to experienced professionals who provide constructive feedback on delivery and content clarity.',
        duration: '2 hours',
        order_index: 3
      }
    ],
    skills: [
      '✓ Professional presentation design (Essential for college and career success)',
      '✓ Public speaking confidence (Transforms shy teens into confident communicators)',
      '✓ Strategic storytelling (Builds persuasion skills for any field)',
      '✓ Executive communication (Prepares for leadership roles)',
      '✓ Critical thinking under pressure (Develops quick problem-solving abilities)'
    ],
    outcome: '💪 Life Skills Your Teen Masters: Master professional presentation skills and develop executive communication abilities that transform shy teens into confident leaders ready for college and career success.'
  };

  const seedWeek1Data = async () => {
    setIsSeeding(true);
    try {
      // Get Week 1 record
      const { data: week1, error: weekError } = await supabase
        .from('weeks')
        .select('*')
        .eq('week_number', 1)
        .single();

      if (weekError) {
        throw new Error(`Week 1 not found: ${weekError.message}`);
      }

      // Clear existing data
      await Promise.all([
        supabase.from('week_activities').delete().eq('week_id', week1.id),
        supabase.from('week_skills').delete().eq('week_id', week1.id),
        supabase.from('week_outcomes').delete().eq('week_id', week1.id)
      ]);

      // Add activities
      const activitiesWithWeekId = week1Data.activities.map(activity => ({
        ...activity,
        week_id: week1.id
      }));

      const { error: activitiesError } = await supabase
        .from('week_activities')
        .insert(activitiesWithWeekId);

      if (activitiesError) {
        throw new Error(`Failed to add activities: ${activitiesError.message}`);
      }

      // Add skills
      const skillsWithWeekId = week1Data.skills.map((skill, index) => ({
        week_id: week1.id,
        skill_name: skill,
        order_index: index
      }));

      const { error: skillsError } = await supabase
        .from('week_skills')
        .insert(skillsWithWeekId);

      if (skillsError) {
        throw new Error(`Failed to add skills: ${skillsError.message}`);
      }

      // Add outcome
      const { error: outcomeError } = await supabase
        .from('week_outcomes')
        .insert({
          week_id: week1.id,
          outcome_text: week1Data.outcome
        });

      if (outcomeError) {
        throw new Error(`Failed to add outcome: ${outcomeError.message}`);
      }

      // Invalidate queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['week-details', 1] });
      queryClient.invalidateQueries({ queryKey: ['weeks'] });

      toast.success('Week 1 content added successfully!');
    } catch (error) {
      console.error('Error seeding Week 1 data:', error);
      toast.error(`Failed to seed Week 1 data: ${error.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-blue border-b-4 border-foreground">
        <CardTitle className="font-black text-xl uppercase">
          Week 1 Data Seeder
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-sm text-foreground/70">
          This will populate Week 1 with the provided executive presentation mastery content including:
        </p>
        <ul className="text-sm space-y-1 ml-4">
          <li>• 4 Activities (Seminar, Workshops, Project)</li>
          <li>• 5 Life Skills</li>
          <li>• 1 Learning Outcome</li>
        </ul>
        <Button 
          onClick={seedWeek1Data}
          disabled={isSeeding}
          className="w-full font-bold"
        >
          {isSeeding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Adding Content...
            </>
          ) : (
            'Add Week 1 Content'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Week1DataSeeder;