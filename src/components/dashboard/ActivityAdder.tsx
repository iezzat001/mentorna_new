
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface Activity {
  type: string;
  title: string;
  description: string;
  duration: string;
}

interface ActivityAdderProps {
  onAdd: (activity: Activity) => void;
}

const ActivityAdder = ({ onAdd }: ActivityAdderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'workshop',
    title: '',
    description: '',
    duration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ type: 'workshop', title: '', description: '', duration: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-accent-yellow border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Activity
      </Button>
    );
  }

  return (
    <Card className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger className="border-2 border-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Activity title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="border-2 border-foreground"
          />
          
          <Textarea
            placeholder="Activity description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border-2 border-foreground"
          />
          
          <Input
            placeholder="Duration (e.g., 2 hours)"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="border-2 border-foreground"
          />
          
          <div className="flex gap-2">
            <Button type="submit" className="bg-primary border-2 border-foreground font-black text-xs">
              Add
            </Button>
            <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="border-2 border-foreground font-black text-xs">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ActivityAdder;
