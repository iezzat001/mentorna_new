
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Mail, Phone, User, Calendar, Eye, EyeOff } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const ContactMessagesManager = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact messages:', error);
        throw error;
      }

      return data as ContactMessage[];
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('Message marked as read');
    },
    onError: (error) => {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    },
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: false })
        .eq('id', messageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('Message marked as unread');
    },
    onError: (error) => {
      console.error('Error marking message as unread:', error);
      toast.error('Failed to mark message as unread');
    },
  });

  const handleToggleReadStatus = (message: ContactMessage) => {
    if (message.is_read) {
      markAsUnreadMutation.mutate(message.id);
    } else {
      markAsReadMutation.mutate(message.id);
    }
  };

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6">
            <div className="text-center">Loading contact messages...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8" />
              <div>
                <div className="text-2xl font-black">{messages.length}</div>
                <div className="font-bold text-sm uppercase">Total Messages</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-purple">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <EyeOff className="h-8 w-8" />
              <div>
                <div className="text-2xl font-black">{unreadCount}</div>
                <div className="font-bold text-sm uppercase">Unread Messages</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-blue">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8" />
              <div>
                <div className="text-2xl font-black">{messages.length - unreadCount}</div>
                <div className="font-bold text-sm uppercase">Read Messages</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Table */}
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
          <CardTitle className="font-black text-2xl uppercase">
            Contact Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-foreground/70">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-bold">No contact messages yet</p>
              <p className="text-sm">Messages will appear here when visitors contact you</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-foreground">
                  <TableHead className="font-bold uppercase">Status</TableHead>
                  <TableHead className="font-bold uppercase">Name</TableHead>
                  <TableHead className="font-bold uppercase">Email</TableHead>
                  <TableHead className="font-bold uppercase">Phone</TableHead>
                  <TableHead className="font-bold uppercase">Date</TableHead>
                  <TableHead className="font-bold uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow 
                    key={message.id}
                    className={`border-b border-foreground/20 ${!message.is_read ? 'bg-accent-yellow/20' : ''}`}
                  >
                    <TableCell>
                      <Badge 
                        className={`font-bold uppercase ${
                          message.is_read 
                            ? 'bg-foreground text-background' 
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {message.is_read ? 'Read' : 'New'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {message.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {message.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {message.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {message.phone}
                        </div>
                      ) : (
                        <span className="text-foreground/50">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedMessage(message)}
                          className="border-2 border-foreground shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold text-xs"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant={message.is_read ? "secondary" : "default"}
                          onClick={() => handleToggleReadStatus(message)}
                          className="border-2 border-foreground shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold text-xs"
                        >
                          {message.is_read ? (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Unread
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Read
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow">
          <CardHeader className="border-b-4 border-foreground bg-foreground text-background">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-black text-xl uppercase">
                  Message from {selectedMessage.name}
                </CardTitle>
                <div className="text-background/80 text-sm mt-1">
                  {format(new Date(selectedMessage.created_at), 'MMMM dd, yyyy at HH:mm')}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMessage(null)}
                className="bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground"
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-bold text-sm uppercase mb-1">Email</div>
                <div className="font-medium">{selectedMessage.email}</div>
              </div>
              {selectedMessage.phone && (
                <div>
                  <div className="font-bold text-sm uppercase mb-1">Phone</div>
                  <div className="font-medium">{selectedMessage.phone}</div>
                </div>
              )}
            </div>
            
            <div>
              <div className="font-bold text-sm uppercase mb-2">Message</div>
              <div className="bg-white border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-4 rounded-lg">
                <p className="font-medium leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactMessagesManager;
