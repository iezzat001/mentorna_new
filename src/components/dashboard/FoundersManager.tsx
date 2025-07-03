
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import FounderForm from './FounderForm';

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

const FoundersManager = () => {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: founders, isLoading } = useQuery({
    queryKey: ['founders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as Founder[];
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('founders')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['founders'] });
      toast.success('Founder deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete founder: ' + error.message);
    }
  });

  const handleEdit = (founder: Founder) => {
    setSelectedFounder(founder);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedFounder(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setSelectedFounder(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this founder?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 font-semibold">Loading founders...</span>
      </div>
    );
  }

  if (showForm) {
    return (
      <FounderForm
        founder={selectedFounder || undefined}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-3xl font-black uppercase">Manage Founders</h2>
        <Button
          onClick={handleAdd}
          className="bg-accent-yellow border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Founder
        </Button>
      </div>

      <div className="grid gap-6">
        {founders?.map((founder) => (
          <Card key={founder.id} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-blue border-b-4 border-foreground">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-black text-xl uppercase mb-2">
                    {founder.name}
                  </CardTitle>
                  <p className="font-bold text-sm">{founder.title}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`font-black text-xs ${founder.is_active ? 'bg-accent-green' : 'bg-gray-400'}`}>
                    {founder.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                  <Badge className="bg-foreground text-background font-black text-xs">
                    ORDER: {founder.order_index}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-black text-sm uppercase mb-2">Short Bio</h4>
                  <p className="font-semibold text-sm mb-4">{founder.short_bio}</p>
                  
                  <h4 className="font-black text-sm uppercase mb-2">Social Media</h4>
                  <div className="space-y-1">
                    <p className="font-semibold text-xs">LinkedIn: {founder.linkedin_url}</p>
                    <p className="font-semibold text-xs">Twitter: {founder.twitter_url}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase mb-2">Extended Bio</h4>
                  <p className="font-semibold text-sm mb-4">{founder.extended_bio}</p>
                  
                  <h4 className="font-black text-sm uppercase mb-2">Image</h4>
                  <div className="w-20 h-20 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-accent-yellow">
                    <img 
                      src={founder.image_url} 
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6 pt-4 border-t-2 border-foreground">
                <Button
                  onClick={() => handleEdit(founder)}
                  className="bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(founder.id)}
                  disabled={deleteMutation.isPending}
                  className="bg-red-500 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoundersManager;
