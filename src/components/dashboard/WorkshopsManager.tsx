import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Users,
  Play,
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Presentation,
  Target,
  Zap,
  BookOpen,
  Video,
  CheckCircle,
} from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  duration: string;
  status: 'completed' | 'upcoming' | 'draft';
  attendees?: number;
  topics: string[];
  description: string;
  materials: {
    type: 'pdf' | 'slides' | 'script' | 'video';
    title: string;
    url?: string;
  }[];
  keyTakeaways: string[];
  targetAudience: string;
}

const workshops: Workshop[] = [
  {
    id: 'workshop-1',
    title: 'Beyond Workflows',
    subtitle: 'Vibe Coding: The Strategic Guide to Building with AI',
    date: 'January 2025',
    duration: '2 hours',
    status: 'completed',
    attendees: 0,
    topics: [
      'What is Vibe Coding',
      'AI-First Development',
      'Replit Agent & Assistant',
      'Computational Thinking',
      'Procedural Thinking',
      'Debugging with AI',
      'Context Management',
      'Building Real Apps',
    ],
    description: 'A comprehensive workshop teaching the fundamentals of vibe coding - building applications using AI without traditional programming knowledge. Covers the evolution from traditional coding to AI-assisted development, with hands-on exercises using Replit.',
    materials: [
      { type: 'slides', title: 'Workshop Slides (Interactive)', url: '/workshops/workshop-1-slides.html' },
    ],
    keyTakeaways: [
      'Be precise - give AI one task at a time',
      'Make prompts specific and detailed',
      'Keep projects organized, add features step by step',
      'Start fresh sessions for new features',
      'Be patient while debugging - it\'s part of the process',
      'Review AI suggestions before accepting',
      'Build understanding of app components as you go',
    ],
    targetAudience: 'Non-technical entrepreneurs, business owners, parents wanting to learn AI skills',
  },
  {
    id: 'workshop-2',
    title: 'Grand Slam Offer',
    subtitle: 'The Value Equation: How to Craft a £100M Offer',
    date: 'January 2025',
    duration: '1.5 hours',
    status: 'completed',
    attendees: 0,
    topics: [
      'The Value Equation',
      'Dream Outcome',
      'Perceived Likelihood',
      'Time Delay',
      'Effort & Sacrifice',
      'Scarcity & Urgency',
      'Guarantees & Risk Reversal',
      'The Bonus Stack',
    ],
    description: 'Based on Alex Hormozi\'s framework, this workshop teaches how to craft irresistible offers by manipulating four key variables. Learn to turn a £2,000 service into a £50,000 solution.',
    materials: [
      { type: 'slides', title: 'Workshop Slides (Interactive)', url: '/workshops/workshop-2-slides.html' },
    ],
    keyTakeaways: [
      'Value = (Dream × Likelihood) ÷ (Delay × Effort)',
      'Outcomes are drivers of STATUS',
      'People pay for certainty, not just results',
      'Time delay kills value - deliver fast wins',
      'Remove effort and sacrifice from the customer',
      'Never discount - add bonuses instead',
      'Use scarcity, urgency, and guarantees as enhancers',
    ],
    targetAudience: 'Entrepreneurs, service providers, anyone selling high-ticket offers',
  },
];

const WorkshopsManager = () => {
  const [expandedWorkshop, setExpandedWorkshop] = useState<string | null>('workshop-1');

  const getStatusBadge = (status: Workshop['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white font-bold">COMPLETED</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 text-white font-bold">UPCOMING</Badge>;
      case 'draft':
        return <Badge variant="outline" className="font-bold">DRAFT</Badge>;
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'slides':
        return <Presentation className="w-4 h-4" />;
      case 'script':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase">Workshops</h1>
          <p className="text-muted-foreground font-medium">Presentations & training materials</p>
        </div>
        <Button className="bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <Presentation className="w-4 h-4 mr-2" />
          Add Workshop
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Total Workshops</p>
                <p className="text-3xl font-black">{workshops.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Presentation className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Completed</p>
                <p className="text-3xl font-black">{workshops.filter(w => w.status === 'completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Total Hours</p>
                <p className="text-3xl font-black">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Materials</p>
                <p className="text-3xl font-black">{workshops.reduce((acc, w) => acc + w.materials.length, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workshops List */}
      <div className="space-y-4">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader 
              className="bg-accent-yellow border-b-4 border-foreground cursor-pointer"
              onClick={() => setExpandedWorkshop(expandedWorkshop === workshop.id ? null : workshop.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center font-black text-xl">
                    {workshop.id.split('-')[1]}
                  </div>
                  <div>
                    <CardTitle className="font-black uppercase text-lg">{workshop.title}</CardTitle>
                    <p className="text-sm font-medium text-foreground/80">{workshop.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(workshop.status)}
                  {expandedWorkshop === workshop.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
            </CardHeader>

            {expandedWorkshop === workshop.id && (
              <CardContent className="p-6">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold">{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4" />
                    <span className="font-bold">{workshop.targetAudience}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-bold uppercase text-sm mb-2">Description</h4>
                  <p className="text-muted-foreground">{workshop.description}</p>
                </div>

                {/* Topics Grid */}
                <div className="mb-6">
                  <h4 className="font-bold uppercase text-sm mb-3">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.topics.map((topic, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="font-medium border-2 border-foreground"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                  <h4 className="font-bold uppercase text-sm mb-3 flex items-center gap-2 text-green-800">
                    <Zap className="w-4 h-4" /> Key Takeaways
                  </h4>
                  <ul className="space-y-2">
                    {workshop.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div>
                  <h4 className="font-bold uppercase text-sm mb-3">Workshop Materials</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {workshop.materials.map((material, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 border-2 border-foreground rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {getMaterialIcon(material.type)}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{material.title}</p>
                            <p className="text-xs text-muted-foreground uppercase">{material.type}</p>
                          </div>
                        </div>
                        {material.url && material.url !== '#' ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-2 border-foreground"
                            onClick={() => window.open(material.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="border-2 border-foreground opacity-50" disabled>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Coming Soon Placeholder */}
      <Card className="border-4 border-dashed border-foreground/30">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Presentation className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-lg mb-2">More Workshops Coming Soon</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Additional workshops on AI entrepreneurship, building digital products, and advanced vibe coding techniques are in development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopsManager;
