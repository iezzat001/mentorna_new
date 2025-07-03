
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, Users, Presentation, CheckCircle, Clock, BookOpen, Lightbulb, Loader2 } from 'lucide-react';
import { useWeekDetails } from '@/hooks/useWeeksData';
import { useQueryClient } from '@tanstack/react-query';

interface WeekDetailsDialogProps {
  week: {
    week: number;
    title: string;
    description: string;
    phase: string;
  };
  children: React.ReactNode;
}

const WeekDetailsDialog = ({ week, children }: WeekDetailsDialogProps) => {
  const queryClient = useQueryClient();
  const { data: weekData, isLoading, error, refetch } = useWeekDetails(week.week);

  const handleDialogOpen = () => {
    // Invalidate and refetch the query when dialog opens
    queryClient.invalidateQueries({ queryKey: ['week-details-data', week.week] });
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleDialogOpen}>
        {children}
      </DialogTrigger>
      <DialogContent className="
        max-w-4xl 
        max-h-[90vh] 
        overflow-y-auto
        border-4 
        border-foreground 
        shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
        bg-white
      ">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="
              bg-foreground 
              text-background 
              font-black 
              text-xl 
              w-16 
              h-16 
              flex 
              items-center 
              justify-center 
              border-4 
              border-foreground
            ">
              {week.week}
            </div>
            <div>
              <DialogTitle className="font-black text-2xl uppercase text-foreground">
                WEEK {week.week}: {week.title}
              </DialogTitle>
              <Badge className="bg-accent-yellow text-foreground font-black uppercase mt-2">
                {week.phase}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-semibold">Loading week details...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="bg-red-100 border-4 border-red-500 p-4 rounded">
              <p className="font-bold text-red-700">Failed to load week details</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Week Overview */}
            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5" />
                  <h3 className="font-black text-lg uppercase">Week Outcome</h3>
                </div>
                <p className="font-body text-base font-semibold">
                  {weekData?.outcome || 'No outcome defined yet.'}
                </p>
              </CardContent>
            </Card>

            {/* Activities Timeline */}
            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5" />
                  <h3 className="font-black text-lg uppercase">Weekly Schedule</h3>
                </div>
                
                {weekData?.activities && weekData.activities.length > 0 ? (
                  <div className="space-y-4">
                    {weekData.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-accent-yellow/20 border-2 border-foreground">
                        <div className="flex-shrink-0">
                          {activity.type === 'assignment' && <BookOpen className="h-5 w-5" />}
                          {activity.type === 'workshop' && <Users className="h-5 w-5" />}
                          {activity.type === 'seminar' && <Presentation className="h-5 w-5" />}
                          {activity.type === 'project' && <Lightbulb className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-foreground text-background font-black uppercase text-xs">
                              {activity.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4" />
                              <span className="font-semibold">{activity.duration}</span>
                            </div>
                          </div>
                          <h4 className="font-black text-base uppercase mb-1">
                            {activity.title}
                          </h4>
                          <p className="font-body text-sm">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-foreground/70 font-semibold">
                    No activities defined yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Key Skills */}
            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5" />
                  <h3 className="font-black text-lg uppercase">Skills You'll Gain</h3>
                </div>
                
                {weekData?.skills && weekData.skills.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {weekData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent-green" />
                        <span className="font-body text-sm font-semibold">{skill}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-foreground/70 font-semibold">
                    No skills defined yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WeekDetailsDialog;
