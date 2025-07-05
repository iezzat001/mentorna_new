
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-black uppercase text-foreground">
          Let's find your doctor
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="
            border-2 
            border-foreground 
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            hover:translate-x-1 
            hover:translate-y-1 
            hover:shadow-none
          "
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="
              min-w-[280px] 
              border-4 
              border-foreground 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              bg-background
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
              hover:scale-[1.02] 
              transition-all
            "
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="
                    w-16 
                    h-16 
                    rounded-full 
                    border-4 
                    border-foreground 
                    object-cover
                  "
                />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-2">
                    {doctor.specialty}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent-yellow text-accent-yellow" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <span className={`
                      px-2 
                      py-1 
                      rounded-full 
                      text-xs 
                      font-bold 
                      border-2 
                      border-foreground
                      ${doctor.available 
                        ? 'bg-accent-green text-foreground' 
                        : 'bg-gray-200 text-foreground/50'
                      }
                    `}>
                      {doctor.available ? 'AVAILABLE' : 'BUSY'}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    disabled={!doctor.available}
                    className="
                      w-full 
                      bg-primary 
                      border-2 
                      border-foreground 
                      shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                      font-bold 
                      uppercase 
                      text-xs
                      hover:translate-x-1 
                      hover:translate-y-1 
                      hover:shadow-none
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    BOOK SESSION
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorFinderSection;
