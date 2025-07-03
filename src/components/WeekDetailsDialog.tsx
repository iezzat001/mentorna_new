import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, Users, Presentation, CheckCircle, Clock, BookOpen, Lightbulb } from 'lucide-react';
import { weekDetailsData } from '@/data/weekDetailsData';

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
  const weekData = weekDetailsData[week.week];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="h-5 w-5" />;
      case 'workshop':
        return <Users className="h-5 w-5" />;
      case 'seminar':
        return <Presentation className="h-5 w-5" />;
      case 'project':
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-accent-blue text-foreground';
      case 'workshop':
        return 'bg-accent-green text-foreground';
      case 'seminar':
        return 'bg-accent-purple text-foreground';
      case 'project':
        return 'bg-accent-yellow text-foreground';
      default:
        return 'bg-foreground text-background';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
        p-0
      ">
        <DialogHeader className="p-6 border-b-4 border-foreground bg-accent-yellow">
          <div className="flex items-center gap-4">
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
            <div className="flex-1">
              <DialogTitle className="font-black text-2xl uppercase text-foreground">
                WEEK {week.week}: {week.title}
              </DialogTitle>
              <DialogDescription className="font-body text-foreground/80 mt-1">
                {week.description}
              </DialogDescription>
              <Badge className="bg-foreground text-background font-black uppercase mt-2">
                {week.phase}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Week Outcome */}
          <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-accent-green" />
                <h3 className="font-black text-xl uppercase text-foreground">Learning Outcome</h3>
              </div>
              <p className="font-body text-base leading-relaxed text-foreground">
                {weekData?.outcome || 'Learning outcomes are being prepared for this week.'}
              </p>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-accent-purple" />
                <h3 className="font-black text-xl uppercase text-foreground">Weekly Activities</h3>
              </div>
              
              {weekData?.activities && weekData.activities.length > 0 ? (
                <div className="space-y-4">
                  {weekData.activities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="bg-background border-2 border-foreground p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <Badge className={`${getActivityColor(activity.type)} font-black uppercase text-xs w-fit`}>
                              {activity.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-foreground/70">
                              <Clock className="h-4 w-4" />
                              <span className="font-semibold">{activity.duration}</span>
                            </div>
                          </div>
                          <h4 className="font-black text-base uppercase mb-2 text-foreground">
                            {activity.title}
                          </h4>
                          <p className="font-body text-sm text-foreground/80 leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-foreground/70">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-semibold">Activities are being prepared for this week.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-accent-green" />
                <h3 className="font-black text-xl uppercase text-foreground">Skills You'll Master</h3>
              </div>
              
              {weekData?.skills && weekData.skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {weekData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-accent-green/20 border-2 border-foreground">
                      <CheckCircle className="h-5 w-5 text-accent-green flex-shrink-0" />
                      <span className="font-body text-sm font-semibold text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-foreground/70">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-semibold">Skills are being defined for this week.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeekDetailsDialog;