import React from 'react';
import { Search, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const DoctorFinderSection = () => {
  const doctors = [{
    id: 1,
    name: "Dr. Alex Chen",
    specialty: "AI Ethics Expert",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    available: true
  }, {
    id: 2,
    name: "Dr. Maria Rodriguez",
    specialty: "Machine Learning",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1594824947017-1cb1a4b41d87?w=100&h=100&fit=crop&crop=face",
    available: false
  }, {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "Data Science",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    available: true
  }];
  return;
};
export default DoctorFinderSection;