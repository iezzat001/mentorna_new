
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
  };
  onInputChange: (field: string, value: string) => void;
  onAgeGroupChange: (ageGroup: string, checked: boolean) => void;
}

const ChildrenInformationSection = ({ 
  formData, 
  onInputChange, 
  onAgeGroupChange 
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
                <div key={option} className="flex items-center space-x-2 bg-white border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="font-semibold text-sm">
                    {option}
                  </Label>
                </div>
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
                <div key={option} className="flex items-center space-x-2 bg-white border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Checkbox
                    id={option}
                    checked={formData.ageGroups.includes(option)}
                    onCheckedChange={(checked) => onAgeGroupChange(option, checked as boolean)}
                    className="border-2 border-foreground"
                  />
                  <Label htmlFor={option} className="font-semibold text-sm">
                    {option}
                  </Label>
                </div>
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
                <div key={option} className="flex items-center space-x-2 bg-white border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="font-semibold text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildrenInformationSection;
