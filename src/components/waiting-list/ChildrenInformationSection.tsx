import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';

interface ChildrenInformationSectionProps {
  formData: {
    childrenCount: string;
    ageGroups: string[];
    codingExperience: string;
    englishLevel: string;
    relationship: string;
    preferredDays: string[];
  };
  onInputChange: (field: string, value: string) => void;
  onAgeGroupChange: (ageGroup: string, checked: boolean) => void;
  onPreferredDayChange: (day: string, checked: boolean) => void;
}

const ChildrenInformationSection = ({ 
  formData, 
  onInputChange, 
  onAgeGroupChange,
  onPreferredDayChange
}: ChildrenInformationSectionProps) => {
  return (
    <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-purple/20">
      <CardContent className="p-6">
        <h3 className="font-black text-lg uppercase text-foreground mb-6 flex items-center gap-2">
          <Users className="h-5 w-5" />
          TELL US ABOUT YOUR CHILD(REN)
        </h3>
        
        <div className="space-y-6">
          {/* Question 1: Number of children */}
          <div>
            <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
              1. How many children do you have? *
            </Label>
            <RadioGroup
              value={formData.childrenCount}
              onValueChange={(value) => onInputChange('childrenCount', value)}
              className="grid grid-cols-2 gap-3"
            >
              {['1 child', '2 children', '3 children', '4+ children'].map((option) => (
                <Label
                  key={option}
                  htmlFor={`children-${option}`}
                  className="
                    flex items-center space-x-3 
                    bg-white border-2 border-foreground p-4 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    cursor-pointer
                    hover:bg-accent-yellow/20
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    font-semibold text-sm
                    w-full
                    touch-manipulation
                  "
                >
                  <RadioGroupItem 
                    value={option} 
                    id={`children-${option}`}
                    className="flex-shrink-0"
                  />
                  <span className="flex-1 select-none">
                    {option}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Question 2: Age group - Multi-select */}
          <div>
            <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
              2. What is their age group? * (Select all that apply)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {['8-12 years', '13-15 years', '16-18 years', '19+ years'].map((option) => (
                <Label
                  key={option}
                  htmlFor={`age-${option}`}
                  className="
                    flex items-center space-x-3 
                    bg-white border-2 border-foreground p-4 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    cursor-pointer
                    hover:bg-accent-blue/20
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    font-semibold text-sm
                    w-full
                    touch-manipulation
                  "
                >
                  <Checkbox
                    id={`age-${option}`}
                    checked={formData.ageGroups.includes(option)}
                    onCheckedChange={(checked) => onAgeGroupChange(option, checked as boolean)}
                    className="border-2 border-foreground flex-shrink-0"
                  />
                  <span className="flex-1 select-none">
                    {option}
                  </span>
                </Label>
              ))}
            </div>
          </div>

          {/* Question 3: Coding experience */}
          <div>
            <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
              3. Have they participated in any coding school before? *
            </Label>
            <RadioGroup
              value={formData.codingExperience}
              onValueChange={(value) => onInputChange('codingExperience', value)}
              className="space-y-3"
            >
              {[
                'No, complete beginner',
                'Yes, online courses',
                'Yes, coding bootcamp',
                'Yes, school programs'
              ].map((option) => (
                <Label
                  key={option}
                  htmlFor={`experience-${option}`}
                  className="
                    flex items-center space-x-3 
                    bg-white border-2 border-foreground p-4 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    cursor-pointer
                    hover:bg-accent-green/20
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    font-semibold text-sm
                    w-full
                    touch-manipulation
                  "
                >
                  <RadioGroupItem 
                    value={option} 
                    id={`experience-${option}`}
                    className="flex-shrink-0"
                  />
                  <span className="flex-1 select-none">
                    {option}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Question 4: English language level */}
          <div>
            <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
              4. What is their English language level? *
            </Label>
            <RadioGroup
              value={formData.englishLevel}
              onValueChange={(value) => onInputChange('englishLevel', value)}
              className="grid grid-cols-3 gap-3"
            >
              {['Beginner', 'Intermediate', 'Advanced'].map((option) => (
                <Label
                  key={option}
                  htmlFor={`english-${option}`}
                  className="
                    flex items-center space-x-3 
                    bg-white border-2 border-foreground p-4 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    cursor-pointer
                    hover:bg-accent-purple/20
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    font-semibold text-sm
                    w-full
                    touch-manipulation
                  "
                >
                  <RadioGroupItem 
                    value={option} 
                    id={`english-${option}`}
                    className="flex-shrink-0"
                  />
                  <span className="flex-1 select-none">
                    {option}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Question 5: Relationship */}
          <div>
            <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
              5. I am the child's... *
            </Label>
            <RadioGroup
              value={formData.relationship}
              onValueChange={(value) => onInputChange('relationship', value)}
              className="grid grid-cols-3 gap-3"
            >
              {['Father', 'Mother', 'Educator'].map((option) => (
                <Label
                  key={option}
                  htmlFor={`relationship-${option}`}
                  className="
                    flex items-center space-x-3 
                    bg-white border-2 border-foreground p-4 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    cursor-pointer
                    hover:bg-accent-blue/20
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    font-semibold text-sm
                    w-full
                    touch-manipulation
                  "
                >
                  <RadioGroupItem 
                    value={option} 
                    id={`relationship-${option}`}
                    className="flex-shrink-0"
                  />
                  <span className="flex-1 select-none">
                    {option}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Question 6: Preferred days */}
          <div>
            <Label className="font-bold text-sm uppercase mb-3 block text-foreground">
              6. Which days work best for workshops/sessions? * (Select all preferred days)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((option) => (
                <Label
                  key={option}
                  htmlFor={`day-${option}`}
                  className="
                    flex items-center space-x-3 
                    bg-white border-2 border-foreground p-4 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    cursor-pointer
                    hover:bg-accent-yellow/20
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    transition-all duration-150
                    font-semibold text-sm
                    w-full
                    touch-manipulation
                  "
                >
                  <Checkbox
                    id={`day-${option}`}
                    checked={formData.preferredDays.includes(option)}
                    onCheckedChange={(checked) => onPreferredDayChange(option, checked as boolean)}
                    className="border-2 border-foreground flex-shrink-0"
                  />
                  <span className="flex-1 select-none">
                    {option}
                  </span>
                </Label>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildrenInformationSection;