
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface SkillAdderProps {
  onAdd: (skill: string) => void;
}

const SkillAdder = ({ onAdd }: SkillAdderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skillName, setSkillName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillName.trim()) {
      onAdd(skillName.trim());
      setSkillName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-accent-yellow border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Skill
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Enter skill name"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        className="border-2 border-foreground"
      />
      <Button type="submit" className="bg-primary border-2 border-foreground font-black text-xs">
        Add
      </Button>
      <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="border-2 border-foreground font-black text-xs">
        Cancel
      </Button>
    </form>
  );
};

export default SkillAdder;
