
import React from 'react';

interface WeekData {
  week: number;
  title: string;
  description: string;
}

interface PhaseWeekCardProps {
  week: WeekData;
}

const PhaseWeekCard = ({ week }: PhaseWeekCardProps) => {
  return (
    <div className="flex items-start space-x-3 p-2 bg-accent-yellow/30 rounded border-2 border-foreground/20">
      <div className="font-bold text-xs bg-foreground text-background rounded-full w-6 h-6 flex items-center justify-center">
        {week.week}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-xs text-foreground">{week.title}</h4>
        <p className="text-xs text-foreground/70 mt-1">{week.description}</p>
      </div>
    </div>
  );
};

export default PhaseWeekCard;
