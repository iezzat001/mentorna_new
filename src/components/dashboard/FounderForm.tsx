
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Founder {
  id: string;
  name: string;
  title: string;
  short_bio: string;
  extended_bio: string;
  image_url: string;
  linkedin_url: string;
  twitter_url: string;
  order_index: number;
  is_active: boolean;
}

interface FounderFormProps {
  founder?: Founder;
  onCancel?: () => void;
}

const FounderForm = ({ founder, onCancel }: FounderFormProps) => {
  const [formData, setFormData] = useState({
    name: founder?.name || '',
    title: founder?.title || '',
    short_bio: founder?.short_bio || '',
    extended_bio: founder?.extended_bio || '',
    image_url: founder?.image_url || '',
    linkedin_url: founder?.linkedin_url || '#',
    twitter_url: founder?.twitter_url || '#',
    order_index: founder?.order_index || 0,
    is_active: founder?.is_active ?? true
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (founder) {
        const { error } = await supabase
          .from('founders')
          .update(data)
          .eq('id', founder.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('founders')
          .insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['founders'] });
      toast.success(founder ? 'Founder updated successfully!' : 'Founder created successfully!');
      if (onCancel) onCancel();
    },
    onError: (error) => {
      toast.error('Failed to save founder: ' + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const handleChange = (field: keyof typeof formData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-green border-b-4 border-foreground">
        <CardTitle className="font-black text-xl uppercase">
          {founder ? 'Edit Founder' : 'Add New Founder'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                required
              />
            </div>
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                required
              />
            </div>
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block">Short Bio</Label>
            <Textarea
              value={formData.short_bio}
              onChange={(e) => handleChange('short_bio', e.target.value)}
              className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block">Extended Bio</Label>
            <Textarea
              value={formData.extended_bio}
              onChange={(e) => handleChange('extended_bio', e.target.value)}
              className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[150px]"
              required
            />
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block">Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">LinkedIn URL</Label>
              <Input
                value={formData.linkedin_url}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
              />
            </div>
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Twitter URL</Label>
              <Input
                value={formData.twitter_url}
                onChange={(e) => handleChange('twitter_url', e.target.value)}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Order Index</Label>
              <Input
                type="number"
                value={formData.order_index}
                onChange={(e) => handleChange('order_index', parseInt(e.target.value) || 0)}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
              />
            </div>
            <div className="flex items-center space-x-2 mt-8">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="is_active" className="font-bold text-sm uppercase">Active</Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {saveMutation.isPending ? 'Saving...' : 'Save Founder'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FounderForm;
