
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { countries } from '@/data/countries';

interface WaitingListEntry {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  children_count: string;
  age_groups: string[];
  coding_experience: string;
  english_level: string;
  relationship: string;
  preferred_days: string[];
  created_at: string;
}

const WaitingListManager = () => {
  const getCountryName = (countryCode: string) => {
    const country = countries.find(c => c.value === countryCode);
    return country ? country.label : countryCode || 'Not specified';
  };
  const { data: waitingList, isLoading, error } = useQuery({
    queryKey: ['waiting-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waiting_list')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WaitingListEntry[];
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground">
            Waiting List
          </h1>
          <p className="font-body text-lg font-semibold text-foreground/70">
            Loading registrations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground">
            Waiting List
          </h1>
          <p className="font-body text-lg font-semibold text-red-600">
            Error loading waiting list data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl font-black uppercase text-foreground">
          Waiting List
        </h1>
        <p className="font-body text-lg font-semibold text-foreground/70">
          View and manage waiting list registrations
        </p>
      </div>

      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-blue border-b-4 border-foreground">
          <CardTitle className="font-black text-2xl uppercase flex items-center gap-2">
            <Users className="h-6 w-6" />
            Registrations ({waitingList?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {waitingList && waitingList.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        WhatsApp
                      </div>
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Country
                      </div>
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      Children Count
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      Age Groups
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      Coding Experience
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      English Level
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      Relationship
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground border-r-2 border-foreground">
                      Preferred Days
                    </TableHead>
                    <TableHead className="font-black uppercase text-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Registered
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitingList.map((entry) => (
                    <TableRow key={entry.id} className="border-b border-foreground/20">
                      <TableCell className="font-semibold border-r border-foreground/20">
                        {entry.name}
                      </TableCell>
                      <TableCell className="border-r border-foreground/20">
                        <a 
                          href={`mailto:${entry.email}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {entry.email}
                        </a>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20">
                        <a 
                          href={`https://wa.me/${entry.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {entry.whatsapp}
                        </a>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20 font-medium">
                        <Badge className="bg-accent-green text-foreground font-bold text-xs">
                          {getCountryName(entry.country)}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20 font-medium">
                        {entry.children_count}
                      </TableCell>
                      <TableCell className="border-r border-foreground/20">
                        <div className="flex flex-wrap gap-1">
                          {entry.age_groups.map((ageGroup, index) => (
                            <Badge 
                              key={index}
                              className="bg-accent-purple text-foreground font-bold text-xs"
                            >
                              {ageGroup}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20 font-medium">
                        <Badge 
                          className={`font-bold text-xs ${
                            entry.coding_experience === 'No experience' 
                              ? 'bg-accent-yellow text-foreground' 
                              : entry.coding_experience === 'Beginner'
                              ? 'bg-accent-green text-foreground'
                              : 'bg-accent-blue text-foreground'
                          }`}
                        >
                          {entry.coding_experience}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20 font-medium">
                        <Badge 
                          className={`font-bold text-xs ${
                            entry.english_level === 'Beginner' 
                              ? 'bg-accent-yellow text-foreground' 
                              : entry.english_level === 'Intermediate'
                              ? 'bg-accent-green text-foreground'
                              : 'bg-accent-blue text-foreground'
                          }`}
                        >
                          {entry.english_level}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20 font-medium">
                        <Badge 
                          className={`font-bold text-xs ${
                            entry.relationship === 'Father' 
                              ? 'bg-accent-blue text-foreground' 
                              : entry.relationship === 'Mother'
                              ? 'bg-accent-purple text-foreground'
                              : 'bg-accent-green text-foreground'
                          }`}
                        >
                          {entry.relationship}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r border-foreground/20">
                        <div className="flex flex-wrap gap-1">
                          {entry.preferred_days?.map((day, index) => (
                            <Badge 
                              key={index}
                              className="bg-accent-yellow text-foreground font-bold text-xs"
                            >
                              {day.slice(0, 3)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {formatDate(entry.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
              <p className="font-body text-lg font-semibold text-foreground/70">
                No waiting list registrations yet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitingListManager;
