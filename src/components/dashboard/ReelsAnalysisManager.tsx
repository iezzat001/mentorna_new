import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Eye,
  Users,
  TrendingUp,
  Play,
  Target,
  Zap,
  Globe,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  UserCheck,
  Video,
  Flame,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Data from CSV analysis
const reelsData = [
  { title: "Vibecoding", language: "EN", category: "vibe-coding", views: 98959, likes: 3560, comments: 920, shares: 2968, saves: 3087, followers: 1777, retention: 27, fypPct: 96.5, topLocation: "Egypt", topLocationPct: 24.3, malePct: 72, age25_34: 21, age35_44: 32 },
  { title: "لو عايز اتعلم AI", language: "AR", category: "AI", views: 11853, likes: 497, comments: 360, shares: 146, saves: 373, followers: 262, retention: 28, fypPct: 90.6, topLocation: "Egypt", topLocationPct: 33.1, malePct: 70, age25_34: 28, age35_44: 28 },
  { title: "Sigma", language: "AR", category: "entrepreneurship", views: 8130, likes: 361, comments: 5, shares: 25, saves: 134, followers: 129, retention: 30, fypPct: 94.7, topLocation: "Egypt", topLocationPct: 91.2, malePct: 82, age25_34: 40, age35_44: 8 },
  { title: "التعليم هيتغير", language: "AR", category: "AI-education", views: 2336, likes: 112, comments: 25, shares: 20, saves: 51, followers: 36, retention: 21, fypPct: 83.0, topLocation: "Egypt", topLocationPct: 68.9, malePct: 72, age25_34: 30, age35_44: 19 },
  { title: "Mvp", language: "EN", category: "entrepreneurship", views: 2082, likes: 71, comments: 9, shares: 17, saves: 38, followers: 28, retention: 31, fypPct: 85.5, topLocation: "Egypt", topLocationPct: 52.0, malePct: 80, age25_34: 35, age35_44: 23 },
  { title: "مقارنات", language: "AR", category: "AI", views: 2079, likes: 61, comments: 1, shares: 9, saves: 51, followers: 14, retention: 46, fypPct: 98.2, topLocation: "Egypt", topLocationPct: 44.4, malePct: 77, age25_34: 30, age35_44: 32 },
  { title: "لو لسه بتدرس", language: "AR", category: "education", views: 1950, likes: 91, comments: 15, shares: 9, saves: 36, followers: 19, retention: 23, fypPct: 94.5, topLocation: "Egypt", topLocationPct: 72.1, malePct: 75, age25_34: 34, age35_44: 14 },
  { title: "ازي تربي رائد اعمال", language: "AR", category: "entrepreneurship", views: 1844, likes: 96, comments: 11, shares: 12, saves: 37, followers: 17, retention: 19, fypPct: 89.3, topLocation: "Egypt", topLocationPct: 67.2, malePct: 77, age25_34: 34, age35_44: 15 },
  { title: "التوعية المالية", language: "AR", category: "finance", views: 1384, likes: 66, comments: 9, shares: 4, saves: 25, followers: 6, retention: 18, fypPct: 87.4, topLocation: "Egypt", topLocationPct: 72.6, malePct: 73, age25_34: 38, age35_44: 13 },
  { title: "هو الذكاء الاصطناعي هياخد مكانك؟", language: "AR", category: "AI", views: 1364, likes: 53, comments: 1, shares: 7, saves: 10, followers: 14, retention: 18, fypPct: 82.1, topLocation: "Egypt", topLocationPct: 81.3, malePct: 74, age25_34: 42, age35_44: 11 },
];

const categoryStats = [
  { category: "Vibe-Coding", videos: 2, views: 99510, followers: 1779, avgRetention: 21.5, color: "bg-green-500" },
  { category: "AI", videos: 8, views: 19469, followers: 346, avgRetention: 24.4, color: "bg-blue-500" },
  { category: "Entrepreneurship", videos: 10, views: 17753, followers: 256, avgRetention: 27.3, color: "bg-purple-500" },
  { category: "AI-Education", videos: 1, views: 2336, followers: 36, avgRetention: 21, color: "bg-cyan-500" },
  { category: "Mindset", videos: 3, views: 1265, followers: 5, avgRetention: 18, color: "bg-orange-500" },
];

const audienceData = {
  demographics: { male: 74, female: 26 },
  ageGroups: [
    { range: "18-24", pct: 31 },
    { range: "25-34", pct: 34 },
    { range: "35-44", pct: 20 },
    { range: "45+", pct: 15 },
  ],
  trafficSources: [
    { source: "For You Page", pct: 85.7 },
    { source: "Personal Profile", pct: 11.2 },
    { source: "Search", pct: 1.5 },
    { source: "Other", pct: 1.6 },
  ],
};

const recommendations = [
  { type: "priority", icon: Flame, title: "Double down on Vibe Coding", desc: "72% of followers come from just 2 videos" },
  { type: "priority", icon: AlertTriangle, title: "Fix hooks at 0:01-0:02", desc: "Retention drops consistently in first 2 seconds" },
  { type: "action", icon: Target, title: "Target young fathers", desc: "Pivot parent segment from general to 'ambitious dads'" },
  { type: "action", icon: TrendingUp, title: "Add search keywords", desc: "'vibe coding شرح', 'AI Egypt', 'تعلم AI'" },
];

const ReelsAnalysisManager = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const totalViews = 144561;
  const totalFollowers = 2458;
  const avgRetention = 24;
  const avgFYP = 85.7;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase">Reels Analysis</h1>
          <p className="text-muted-foreground font-medium">30 videos analyzed • Data-driven insights</p>
        </div>
        <Badge className="bg-green-500 text-white font-bold px-4 py-2">
          <TrendingUp className="w-4 h-4 mr-2" />
          LIVE DATA
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Total Views</p>
                <p className="text-3xl font-black">{totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Followers Gained</p>
                <p className="text-3xl font-black">{totalFollowers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 font-bold mt-2 flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" /> 1.7% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Avg Retention</p>
                <p className="text-3xl font-black">{avgRetention}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress value={avgRetention} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">FYP Traffic</p>
                <p className="text-3xl font-black">{avgFYP}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <Progress value={avgFYP} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader 
          className="bg-accent-yellow border-b-4 border-foreground cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="font-black uppercase flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> Category Performance
            </CardTitle>
            {expandedSection === 'categories' ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSection === 'categories' && (
          <CardContent className="p-4">
            <div className="space-y-4">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className="border-2 border-foreground p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${cat.color}`}></div>
                      <span className="font-bold">{cat.category}</span>
                      <Badge variant="outline" className="font-mono">{cat.videos} videos</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold">{cat.views.toLocaleString()} views</span>
                      <span className="text-green-600 font-bold">+{cat.followers} followers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Share of views:</span>
                    <Progress value={(cat.views / totalViews) * 100} className="flex-1 h-2" />
                    <span className="text-xs font-bold">{((cat.views / totalViews) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Key Insight Box */}
            <div className="mt-4 p-4 bg-green-50 border-4 border-green-500 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-black text-green-800">VIBE CODING = YOUR MOAT</p>
                  <p className="text-green-700">2 videos generate 68.8% of all views and 72.4% of all new followers. This is your competitive advantage.</p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Top Performers */}
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader 
          className="bg-accent-purple border-b-4 border-foreground cursor-pointer"
          onClick={() => toggleSection('performers')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="font-black uppercase flex items-center gap-2">
              <Video className="w-5 h-5" /> Top 10 Performers
            </CardTitle>
            {expandedSection === 'performers' ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSection === 'performers' && (
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-black uppercase text-xs">Video</th>
                    <th className="text-right p-3 font-black uppercase text-xs">Views</th>
                    <th className="text-right p-3 font-black uppercase text-xs">Followers</th>
                    <th className="text-right p-3 font-black uppercase text-xs">Retention</th>
                    <th className="text-right p-3 font-black uppercase text-xs">FYP %</th>
                    <th className="text-center p-3 font-black uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reelsData.map((reel, idx) => (
                    <tr key={idx} className="border-b-2 border-foreground/20 hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{reel.language}</Badge>
                          <span className="font-bold truncate max-w-[200px]">{reel.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{reel.category}</span>
                      </td>
                      <td className="text-right p-3 font-bold">{reel.views.toLocaleString()}</td>
                      <td className="text-right p-3 font-bold text-green-600">+{reel.followers}</td>
                      <td className="text-right p-3">
                        <span className={`font-bold ${reel.retention >= 30 ? 'text-green-600' : reel.retention >= 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {reel.retention}%
                        </span>
                      </td>
                      <td className="text-right p-3 font-mono">{reel.fypPct}%</td>
                      <td className="text-center p-3">
                        {reel.views > 5000 ? (
                          <Badge className="bg-green-500">VIRAL</Badge>
                        ) : reel.views > 1000 ? (
                          <Badge className="bg-blue-500">STRONG</Badge>
                        ) : (
                          <Badge variant="outline">NORMAL</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Audience Demographics */}
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader 
          className="bg-accent-blue border-b-4 border-foreground cursor-pointer"
          onClick={() => toggleSection('audience')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="font-black uppercase flex items-center gap-2">
              <UserCheck className="w-5 h-5" /> Audience Demographics
            </CardTitle>
            {expandedSection === 'audience' ? <ChevronUp /> : <ChevronDown />}
          </div>
        </CardHeader>
        {expandedSection === 'audience' && (
          <CardContent className="p-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Gender */}
              <div className="border-2 border-foreground p-4 rounded-lg">
                <h4 className="font-bold uppercase text-sm mb-3">Gender Split</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Male</span>
                      <span className="font-bold">{audienceData.demographics.male}%</span>
                    </div>
                    <Progress value={audienceData.demographics.male} className="h-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Female</span>
                      <span className="font-bold">{audienceData.demographics.female}%</span>
                    </div>
                    <Progress value={audienceData.demographics.female} className="h-3" />
                  </div>
                </div>
              </div>

              {/* Age Groups */}
              <div className="border-2 border-foreground p-4 rounded-lg">
                <h4 className="font-bold uppercase text-sm mb-3">Age Distribution</h4>
                <div className="space-y-2">
                  {audienceData.ageGroups.map((age, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs w-12">{age.range}</span>
                      <Progress value={age.pct} className="flex-1 h-2" />
                      <span className="text-xs font-bold w-8">{age.pct}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>25-44 = 54%</strong> → Primary target
                </p>
              </div>

              {/* Traffic Sources */}
              <div className="border-2 border-foreground p-4 rounded-lg">
                <h4 className="font-bold uppercase text-sm mb-3">Traffic Sources</h4>
                <div className="space-y-2">
                  {audienceData.trafficSources.map((src, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs w-24 truncate">{src.source}</span>
                      <Progress value={src.pct} className="flex-1 h-2" />
                      <span className="text-xs font-bold w-12">{src.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Persona Validation */}
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                <p className="font-black text-green-800 text-sm">✅ SEGMENT 1: Business Owners</p>
                <p className="text-green-700 text-sm">25-44 males, Egypt, searching "AI", "startup" → VALIDATED</p>
              </div>
              <div className="p-4 bg-yellow-50 border-2 border-yellow-500 rounded-lg">
                <p className="font-black text-yellow-800 text-sm">⚠️ SEGMENT 2: Parents</p>
                <p className="text-yellow-700 text-sm">Only 20% are 35-44, 76% male → Pivot to "young fathers"</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Strategic Recommendations */}
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-primary border-b-4 border-foreground">
          <CardTitle className="font-black uppercase text-white flex items-center gap-2">
            <Target className="w-5 h-5" /> Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className={`p-4 border-2 rounded-lg flex items-start gap-3 ${
                  rec.type === 'priority' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-foreground bg-white'
                }`}
              >
                <rec.icon className={`w-6 h-6 flex-shrink-0 ${
                  rec.type === 'priority' ? 'text-red-600' : 'text-foreground'
                }`} />
                <div>
                  <p className="font-black">{rec.title}</p>
                  <p className="text-sm text-muted-foreground">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Strategy */}
          <div className="mt-6 p-4 border-4 border-foreground rounded-lg bg-accent-yellow">
            <h4 className="font-black uppercase mb-3">Recommended Content Mix</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-3 bg-white border-2 border-foreground rounded">
                <p className="text-2xl font-black">50%</p>
                <p className="text-xs font-bold">Vibe Coding</p>
              </div>
              <div className="text-center p-3 bg-white border-2 border-foreground rounded">
                <p className="text-2xl font-black">30%</p>
                <p className="text-xs font-bold">AI Education</p>
              </div>
              <div className="text-center p-3 bg-white border-2 border-foreground rounded">
                <p className="text-2xl font-black">15%</p>
                <p className="text-xs font-bold">Entrepreneurship</p>
              </div>
              <div className="text-center p-3 bg-white border-2 border-foreground rounded">
                <p className="text-2xl font-black">5%</p>
                <p className="text-xs font-bold">Personal Brand</p>
              </div>
            </div>
          </div>

          {/* Funnel Path */}
          <div className="mt-6 p-4 border-4 border-foreground rounded-lg">
            <h4 className="font-black uppercase mb-3">Conversion Funnel</h4>
            <div className="flex items-center justify-between text-center">
              <div className="flex-1 p-2">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs font-bold">TikTok</p>
                <p className="text-xs text-muted-foreground">Content</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 p-2">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-xs font-bold">Lead Magnet</p>
                <p className="text-xs text-muted-foreground">/vibecoding</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 p-2">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs font-bold">Email Capture</p>
                <p className="text-xs text-muted-foreground">WhatsApp</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 p-2">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-xs font-bold">Workshop</p>
                <p className="text-xs text-muted-foreground">$50-100</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 p-2">
                <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-xs font-bold">Mentorship</p>
                <p className="text-xs text-muted-foreground">$1,000+</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs to Track */}
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-foreground text-white">
          <CardTitle className="font-black uppercase">90-Day Targets</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-2 border-foreground rounded-lg">
              <p className="text-sm text-muted-foreground">Avg Retention</p>
              <p className="text-lg">24% → <span className="font-black text-green-600">35%</span></p>
            </div>
            <div className="text-center p-4 border-2 border-foreground rounded-lg">
              <p className="text-sm text-muted-foreground">Follower/View</p>
              <p className="text-lg">1.7% → <span className="font-black text-green-600">2.5%</span></p>
            </div>
            <div className="text-center p-4 border-2 border-foreground rounded-lg">
              <p className="text-sm text-muted-foreground">Leads/Week</p>
              <p className="text-lg">~1 → <span className="font-black text-green-600">10+</span></p>
            </div>
            <div className="text-center p-4 border-2 border-foreground rounded-lg">
              <p className="text-sm text-muted-foreground">Workshop Signups</p>
              <p className="text-lg">0 → <span className="font-black text-green-600">30</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReelsAnalysisManager;
