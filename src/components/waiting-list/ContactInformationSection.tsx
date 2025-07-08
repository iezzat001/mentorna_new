
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { countries } from '@/data/countries';

interface ContactInformationSectionProps {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
    country: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const ContactInformationSection = ({ formData, onInputChange }: ContactInformationSectionProps) => {
  return (
    <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow/20">
      <CardContent className="p-6">
        <h3 className="font-black text-lg uppercase text-foreground mb-4 flex items-center gap-2">
          <User className="h-5 w-5" />
          CONTACT INFORMATION
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
              <Mail className="h-4 w-4 inline mr-2" />
              Parent/Guardian Name *
            </Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                font-semibold
                focus:translate-x-1 
                focus:translate-y-1 
                focus:shadow-none 
                transition-all
              "
            />
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address *
            </Label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                font-semibold
                focus:translate-x-1 
                focus:translate-y-1 
                focus:shadow-none 
                transition-all
              "
            />
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
              <Phone className="h-4 w-4 inline mr-2" />
              WhatsApp Number *
            </Label>
            <Input
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => onInputChange('whatsapp', e.target.value)}
              placeholder="Enter your WhatsApp number"
              className="
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                font-semibold
                focus:translate-x-1 
                focus:translate-y-1 
                focus:shadow-none 
                transition-all
              "
            />
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block text-foreground">
              <MapPin className="h-4 w-4 inline mr-2" />
              Country/Region *
            </Label>
            <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
              <SelectTrigger className="
                border-4 
                border-foreground 
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                font-semibold
                focus:translate-x-1 
                focus:translate-y-1 
                focus:shadow-none 
                transition-all
              ">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformationSection;
