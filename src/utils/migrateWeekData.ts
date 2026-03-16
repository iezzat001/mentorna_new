
import { supabase } from '@/integrations/supabase/client';
import { weekDetailsData } from '@/data/weekDetailsData';

export const migrateWeekData = async () => {
  try {
    console.log('Starting migration of week data...');
    
    // Get all weeks from database
    const { data: weeks, error: weeksError } = await supabase
      .from('weeks')
      .select('*')
      .order('week_number');
    
    if (weeksError) throw weeksError;
    
    for (const week of weeks) {
      const weekDetails = weekDetailsData[week.week_number];
      if (!weekDetails) continue;
      
      console.log(`Migrating data for week ${week.week_number}...`);
      
      // Clear existing data first to avoid conflicts
      await supabase.from('week_activities').delete().eq('week_id', week.id);
      await supabase.from('week_skills').delete().eq('week_id', week.id);
      
      // Insert or update outcome
      const { error: outcomeError } = await supabase
        .from('week_outcomes')
        .upsert({
          week_id: week.id,
          outcome_text: weekDetails.outcome
        }, {
          onConflict: 'week_id'
        });
      
      if (outcomeError) {
        console.error(`Error inserting outcome for week ${week.week_number}:`, outcomeError);
        continue;
      }
      
      // Insert activities
      for (let i = 0; i < weekDetails.activities.length; i++) {
        const activity = weekDetails.activities[i];
        const { error: activityError } = await supabase
          .from('week_activities')
          .insert({
            week_id: week.id,
            activity_type: activity.type,
            title: activity.title,
            description: activity.description,
            duration: activity.duration,
            order_index: i
          });
        
        if (activityError) {
          console.error(`Error inserting activity for week ${week.week_number}:`, activityError);
        }
      }
      
      // Insert skills
      for (let i = 0; i < weekDetails.skills.length; i++) {
        const skill = weekDetails.skills[i];
        const { error: skillError } = await supabase
          .from('week_skills')
          .insert({
            week_id: week.id,
            skill_name: skill,
            order_index: i
          });
        
        if (skillError) {
          console.error(`Error inserting skill for week ${week.week_number}:`, skillError);
        }
      }
    }
    
    console.log('Migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
};
