
import React from 'react';
import { Search, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DoctorFinderSection = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Alex Chen",
      specialty: "AI Ethics Expert",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      available: true
    },
    {
      id: 2,
      name: "Dr. Maria Rodriguez",
      specialty: "Machine Learning",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1594824947017-1cb1a4b41d87?w=100&h=100&fit=crop&crop=face",
      available: false
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      specialty: "Data Science",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      available: true
    }
  ];

  return (
    <div className="
      bg-accent-blue 
      border-4 
      border-foreground 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      p-6 
      mb-6
    ">
      <h2 className="font-heading text-2xl font-black uppercase mb-4 text-white">
        FIND A DOCTOR
      </h2>
      
      <div className="
        bg-white 
        border-4 
        border-foreground 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        p-4 
        mb-6
      ">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-foreground" />
          <input 
            type="text" 
            placeholder="SEARCH SPECIALISTS..."
            className="
              flex-1 
              border-2 
              border-foreground 
              px-3 
              py-2 
              font-bold 
              placeholder:font-semibold
              focus:outline-none
            "
          />
        </div>
        
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="
              border-2 
              border-foreground 
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            ">
              <CardContent className="p-4 flex items-center gap-4">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full border-2 border-foreground"
                />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg">
                    {doctor.name}
                  </h3>
                  <p className="font-body text-sm text-gray-600">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-accent-yellow text-accent-yellow" />
                    <span className="font-bold text-sm">{doctor.rating}</span>
                  </div>
                </div>
                <Button 
                  className={`
                    border-2 
                    border-foreground 
                    font-black 
                    uppercase 
                    text-xs
                    ${doctor.available 
                      ? 'bg-accent-green text-white' 
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }
                  `}
                  disabled={!doctor.available}
                >
                  {doctor.available ? 'BOOK NOW' : 'UNAVAILABLE'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinderSection;
