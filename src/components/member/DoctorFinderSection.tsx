
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-black uppercase mb-2">
          LET'S FIND YOUR DOCTOR
        </h2>
        <p className="font-body text-foreground/70">
          Connect with AI education experts
        </p>
      </div>

      <div className="
        bg-background 
        border-4 
        border-foreground 
        rounded-lg 
        p-4 
        flex 
        items-center 
        gap-3
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
      ">
        <Search className="w-5 h-5 text-foreground/50" />
        <input 
          type="text" 
          placeholder="SEARCH SPECIALISTS..."
          className="
            flex-1 
            bg-transparent 
            font-body 
            font-semibold 
            placeholder:font-semibold 
            placeholder:text-foreground/50
            focus:outline-none
          "
        />
      </div>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="
            border-2 
            border-foreground 
            shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] 
            bg-background
            hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
            hover:scale-[1.01] 
            transition-all
          ">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name}
                  className="
                    w-16 
                    h-16 
                    rounded-full 
                    border-2 
                    border-foreground
                    object-cover
                  "
                />
                
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold">
                    {doctor.name}
                  </h3>
                  <p className="font-body text-sm text-foreground/70 mb-2">
                    {doctor.specialty}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-body text-sm font-semibold">
                        {doctor.rating}
                      </span>
                    </div>
                    
                    <div className={`
                      px-2 
                      py-1 
                      rounded-full 
                      text-xs 
                      font-bold 
                      uppercase
                      ${doctor.available 
                        ? 'bg-green-100 text-green-600 border border-green-600' 
                        : 'bg-red-100 text-red-600 border border-red-600'
                      }
                    `}>
                      {doctor.available ? 'AVAILABLE' : 'BUSY'}
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm"
                  disabled={!doctor.available}
                  className="
                    bg-primary 
                    border-2 
                    border-foreground 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                    font-black 
                    text-xs 
                    uppercase
                    hover:translate-x-1 
                    hover:translate-y-1 
                    hover:shadow-none
                    disabled:opacity-50
                    disabled:hover:translate-x-0
                    disabled:hover:translate-y-0
                    disabled:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  "
                >
                  BOOK
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorFinderSection;
