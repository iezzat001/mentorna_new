import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from 'convex/react';
import { api } from '@/lib/convex';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle, Cpu, Brain, Globe, Blocks, Target, Languages, Sparkles, Mail, MessageCircle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Data
const aiSubfields = [
  { name: 'AI Agents', nameAr: 'وكلاء AI', value: 9.5, salary: '$240K', risk: 'Low', riskAr: 'منخفض', color: '#27ae60' },
  { name: 'AI Safety', nameAr: 'سلامة AI', value: 9.0, salary: '$310K', risk: 'Very Low', riskAr: 'منخفض جداً', color: '#2ecc71' },
  { name: 'MLOps', nameAr: 'MLOps', value: 8.5, salary: '$182K', risk: 'Medium', riskAr: 'متوسط', color: '#3498db' },
];

const geoData = [
  { name: '🇺🇸 USA', nameAr: '🇺🇸 أمريكا', growth: 33 },
  { name: '🇸🇦 Saudi', nameAr: '🇸🇦 السعودية', growth: 45 },
  { name: '🇦🇪 UAE', nameAr: '🇦🇪 الإمارات', growth: 40 },
  { name: '🇮🇳 India', nameAr: '🇮🇳 الهند', growth: 52 },
  { name: '🇨🇳 China', nameAr: '🇨🇳 الصين', growth: 28 },
];

const timelineData = [
  { year: '2025', quantum: 5, ai: 85, blockchain: 40 },
  { year: '2027', quantum: 15, ai: 92, blockchain: 55 },
  { year: '2029', quantum: 35, ai: 95, blockchain: 70 },
  { year: '2031', quantum: 60, ai: 97, blockchain: 82 },
  { year: '2033', quantum: 80, ai: 98, blockchain: 90 },
  { year: '2035', quantum: 95, ai: 99, blockchain: 95 },
];

const blockchainData = [
  { name: 'ZK Engineering', nameAr: 'هندسة ZK', value: 35, salary: '$180-250K' },
  { name: 'RWA Tokenization', nameAr: 'ترميز RWA', value: 30, salary: '$150-200K' },
  { name: 'Smart Contract Audit', nameAr: 'تدقيق العقود', value: 20, salary: '$150-220K' },
  { name: 'DeFi', nameAr: 'DeFi', value: 15, salary: '$140-180K' },
];

const COLORS = ['#1a5276', '#2980b9', '#27ae60', '#f39c12'];


const SkillsIn2026 = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [contactValue, setContactValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const createLead = useMutation(api.leads.create);
  const isAr = lang === 'ar';

  const handleSubmit = async () => {
    if (!contactValue.trim()) return;
    setIsSubmitting(true);

    try {
      await createLead({
        email: contactMethod === 'email' ? contactValue.trim() : undefined,
        whatsapp: contactMethod === 'whatsapp' ? contactValue.trim() : undefined,
        source: 'Skills in 2026',
      });

      setIsSubscribed(true);
      toast({
        title: isAr ? "تم بنجاح!" : "Success!",
        description: isAr ? "تم اشتراكك بنجاح!" : "You've been subscribed successfully!",
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr ? "فشل الاشتراك. يرجى المحاولة مرة أخرى." : "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: isAr ? 'نظرة عامة' : 'Overview', icon: Target },
    { id: 'ai', label: isAr ? 'الذكاء الاصطناعي' : 'AI', icon: Brain },
    { id: 'quantum', label: isAr ? 'الحوسبة الكمية' : 'Quantum', icon: Cpu },
    { id: 'blockchain', label: isAr ? 'البلوكتشين' : 'Blockchain', icon: Blocks },
    { id: 'geo', label: isAr ? 'الفرص الجغرافية' : 'Geography', icon: Globe },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="bg-gradient-to-br from-accent-yellow via-accent-yellow/90 to-accent-yellow/70 border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-10 md:py-14">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="bg-foreground text-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] font-bold text-sm px-4 py-2"
            >
              <Languages className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
                <img src="https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur.png" alt="Ahmed Ezzat" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-accent-blue border-2 border-foreground rounded-full p-1">
                <CheckCircle className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <div className="text-center md:text-start flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 md:justify-start">
                <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground">
                  {isAr ? 'أحمد عزت' : 'Ahmed Ezzat'}
                </h2>
                <Badge className="bg-foreground text-background font-bold text-xs px-2 py-0.5 w-fit mx-auto md:mx-0">@mentorna</Badge>
              </div>
              <p className="font-body text-sm md:text-base font-semibold text-foreground/80 mb-3 text-center md:text-start">
                {isAr ? 'مستشار ذكاء اصطناعي ورائد أعمال' : 'AI Consultant & Serial Entrepreneur'}
              </p>
              <div className="flex flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-4">
                <div className="text-center min-w-[80px]">
                  <p className="font-heading font-black text-lg text-foreground whitespace-nowrap">5+</p>
                  <p className="text-xs font-semibold text-foreground/70 whitespace-nowrap">{isAr ? 'سنوات في AI' : 'Years in AI'}</p>
                </div>
                <div className="text-center min-w-[80px]">
                  <p className="font-heading font-black text-lg text-foreground whitespace-nowrap">100+</p>
                  <p className="text-xs font-semibold text-foreground/70 whitespace-nowrap">{isAr ? 'طالب تم مساعدتهم' : 'Students Helped'}</p>
                </div>
                <div className="text-center min-w-[80px]">
                  <p className="font-heading font-black text-lg text-foreground whitespace-nowrap">3</p>
                  <p className="text-xs font-semibold text-foreground/70 whitespace-nowrap">{isAr ? 'شركات ناشئة' : 'Startups'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-3 leading-tight">
              {isAr ? 'خارطة طريق المهارات التقنية 2025-2035 🗺️' : 'Tech Skills Roadmap 2025-2035 🗺️'}
            </h1>
            <p className="font-body text-base md:text-lg font-semibold text-foreground/80">
              {isAr 
                ? 'أي المهارات يجب تعلمها الآن لأقصى عائد مهني. تحليل مبني على البيانات.' 
                : 'Which skills to learn now for maximum career ROI. Data-driven analysis.'}
            </p>
          </div>
        </div>
      </section>


      {/* Tab Navigation - Dropdown on Mobile, Buttons on Desktop */}
      <section className="bg-foreground py-4 border-b-4 border-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Mobile: Dropdown */}
          <div className="md:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full bg-accent-yellow border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] font-bold">
                <SelectValue>
                  {currentTab && (
                    <span className="flex items-center gap-2">
                      <currentTab.icon className="w-4 h-4" />
                      {currentTab.label}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="border-4 border-foreground">
                {tabs.map(tab => (
                  <SelectItem key={tab.id} value={tab.id} className="font-semibold">
                    <span className="flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop: Buttons */}
          <div className="hidden md:flex gap-2 justify-center">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] font-bold text-sm px-4 py-2 ${
                  activeTab === tab.id 
                    ? 'bg-accent-yellow text-foreground' 
                    : 'bg-foreground text-background hover:bg-accent-yellow hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-8">
              {isAr ? 'لمحة عن السوق' : 'Market Snapshot'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: '$97B', label: isAr ? 'سوق الكم' : 'Quantum Market', sub: isAr ? 'بحلول 2035' : 'by 2035', color: 'bg-accent-purple' },
                { value: '250K', label: isAr ? 'وظائف كمية' : 'Quantum Jobs', sub: isAr ? 'بحلول 2030' : 'by 2030', color: 'bg-accent-green' },
                { value: '$16T', label: isAr ? 'سوق RWA' : 'RWA Market', sub: isAr ? 'بحلول 2030' : 'by 2030', color: 'bg-accent-blue' },
                { value: '+40%', label: isAr ? 'نمو AI' : 'AI Growth', sub: isAr ? 'حتى 2027' : 'until 2027', color: 'bg-accent-yellow' },
              ].map((stat, i) => (
                <Card key={i} className={`border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${stat.color}`}>
                  <CardContent className="p-4 text-center">
                    <p className="font-heading text-2xl md:text-3xl font-black text-foreground">{stat.value}</p>
                    <p className="font-body text-sm font-bold text-foreground/90">{stat.label}</p>
                    <p className="font-body text-xs text-foreground/70">{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
              <CardHeader className="bg-accent-purple border-b-4 border-foreground">
                <CardTitle className="font-black text-lg uppercase text-foreground text-center">
                  {isAr ? 'تطور الطلب على المهارات' : 'Skills Demand Evolution'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ai" stroke="#27ae60" strokeWidth={3} name="AI" dot={{ fill: '#27ae60', r: 5 }} />
                    <Line type="monotone" dataKey="quantum" stroke="#1a5276" strokeWidth={3} name={isAr ? 'الكم' : 'Quantum'} dot={{ fill: '#1a5276', r: 5 }} />
                    <Line type="monotone" dataKey="blockchain" stroke="#f39c12" strokeWidth={3} name={isAr ? 'بلوكتشين' : 'Blockchain'} dot={{ fill: '#f39c12', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-foreground">
              <CardContent className="p-6 md:p-8 text-center">
                <h3 className="font-heading text-xl md:text-2xl font-black text-accent-yellow mb-4">
                  {isAr ? '🎯 الأولوية الفورية' : '🎯 Immediate Priority'}
                </h3>
                <p className="font-body text-lg text-background mb-2">
                  {isAr ? 'أفضل استثمار ROI اليوم: ' : 'Best ROI investment today: '}
                  <span className="font-black text-accent-yellow">{isAr ? 'وكلاء الذكاء الاصطناعي' : 'AI Agents'}</span>
                </p>
                <p className="font-body text-sm text-background/80">
                  {isAr ? 'قابل للتطبيق فوراً • رواتب $200-280K • مخاطر تسليع منخفضة' : 'Immediately applicable • $200-280K salaries • Low commoditization risk'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}


      {/* AI Tab */}
      {activeTab === 'ai' && (
        <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-8">
              {isAr ? 'تصنيف مجالات AI حسب القيمة المهنية' : 'AI Subfields Ranked by Career Value'}
            </h2>

            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
              <CardContent className="p-4 md:p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={aiSubfields} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" domain={[0, 10]} />
                    <YAxis type="category" dataKey={isAr ? 'nameAr' : 'name'} width={100} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                      {aiSubfields.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {aiSubfields.map((skill, i) => (
                <Card key={i} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader className="py-3 border-b-4 border-foreground" style={{ backgroundColor: skill.color }}>
                    <CardTitle className="font-black text-lg text-white">{isAr ? skill.nameAr : skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{isAr ? 'الراتب:' : 'Salary:'}</span>
                      <span className="font-black text-accent-green">{skill.salary}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{isAr ? 'المخاطر:' : 'Risk:'}</span>
                      <Badge className="bg-accent-yellow text-foreground font-bold text-xs">{isAr ? skill.riskAr : skill.risk}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-green/20">
              <CardContent className="p-6">
                <h4 className="font-heading font-black text-lg mb-4">
                  {isAr ? '🔧 المهارات الأساسية لوكلاء AI' : '🔧 Core Skills for AI Agents'}
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {(isAr ? [
                    'LangChain, LlamaIndex - أطر تنسيق النماذج',
                    'تصميم أنظمة الوكلاء المتعددة',
                    'هندسة RAG وقواعد البيانات المتجهة',
                    'Model Context Protocol (MCP)',
                  ] : [
                    'LangChain, LlamaIndex - Model orchestration',
                    'Multi-agent system design',
                    'RAG engineering & vector databases',
                    'Model Context Protocol (MCP)',
                  ]).map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                      <span className="font-body text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}


      {/* Quantum Tab */}
      {activeTab === 'quantum' && (
        <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-8">
              {isAr ? 'ثورة الحوسبة القادمة' : 'The Next Computing Revolution'}
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '$97B', label: isAr ? 'السوق 2035' : 'Market 2035', color: 'bg-accent-purple' },
                { value: '250K', label: isAr ? 'الوظائف 2030' : 'Jobs 2030', color: 'bg-accent-green' },
                { value: '3:1', label: isAr ? 'الطلب/العرض' : 'Demand/Supply', color: 'bg-accent-yellow' },
              ].map((stat, i) => (
                <Card key={i} className={`border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${stat.color}`}>
                  <CardContent className="p-4 text-center">
                    <p className="font-heading text-xl md:text-2xl font-black text-foreground">{stat.value}</p>
                    <p className="font-body text-xs font-bold text-foreground/80">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
              <CardHeader className="bg-accent-blue border-b-4 border-foreground">
                <CardTitle className="font-black text-lg uppercase text-foreground text-center">
                  {isAr ? 'الجدول الزمني للاستثمار' : 'Investment Timeline'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {[
                  { period: '2025-2027', en: 'Learn fundamentals, Qiskit certification', ar: 'تعلم الأساسيات، شهادة Qiskit', color: 'bg-accent-green/20' },
                  { period: '2028-2030', en: 'Quantum skills become valuable at scale', ar: 'المهارات الكمية تصبح قيّمة', color: 'bg-accent-yellow/20' },
                  { period: '2031-2035', en: 'Full commercial adoption', ar: 'اعتماد تجاري كامل', color: 'bg-accent-purple/20' },
                ].map((row, i) => (
                  <div key={i} className={`${row.color} border-b-2 border-foreground/20 p-4 flex flex-col md:flex-row md:items-center gap-2`}>
                    <span className="font-heading font-black text-lg md:w-32">{row.period}</span>
                    <span className="font-body text-sm text-foreground/80">{isAr ? row.ar : row.en}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-foreground">
              <CardContent className="p-6">
                <h4 className="font-heading font-black text-lg text-background mb-4">
                  {isAr ? '🛠️ الأطر الأساسية' : '🛠️ Key Frameworks'}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['IBM Qiskit', 'Google Cirq', 'PennyLane', 'Amazon Braket'].map(fw => (
                    <Badge key={fw} className="bg-accent-yellow text-foreground font-bold text-sm px-4 py-2 border-2 border-foreground">{fw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Blockchain Tab */}
      {activeTab === 'blockchain' && (
        <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-8">
              {isAr ? 'التخصصات عالية القيمة' : 'High-Value Specializations'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="bg-accent-purple border-b-4 border-foreground py-3">
                  <CardTitle className="font-black text-base uppercase text-foreground text-center">
                    {isAr ? 'توزيع الطلب' : 'Demand Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={blockchainData} dataKey="value" nameKey={isAr ? 'nameAr' : 'name'} cx="50%" cy="50%" outerRadius={70}>
                        {blockchainData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {blockchainData.map((item, i) => (
                  <Card key={i} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <CardContent className="p-4 flex justify-between items-center">
                      <span className="font-heading font-bold">{isAr ? item.nameAr : item.name}</span>
                      <span className="font-heading font-black text-accent-green">{item.salary}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Geography Tab */}
      {activeTab === 'geo' && (
        <section className="py-12 md:py-16 bg-white border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground mb-8">
              {isAr ? 'أين تبني مسيرتك المهنية' : 'Where to Build Your Career'}
            </h2>

            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
              <CardHeader className="bg-accent-green border-b-4 border-foreground">
                <CardTitle className="font-black text-lg uppercase text-foreground text-center">
                  {isAr ? 'معدل نمو التوظيف في AI (%)' : 'AI Hiring Growth Rate (%)'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={geoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey={isAr ? 'nameAr' : 'name'} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="growth" fill="#27ae60" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-accent-purple to-accent-blue">
                <CardContent className="p-6">
                  <h4 className="font-heading font-black text-xl text-foreground mb-2">{isAr ? '🇸🇦🇦🇪 منطقة الخليج' : '🇸🇦🇦🇪 Gulf Region'}</h4>
                  <p className="font-body text-sm text-foreground/90">{isAr ? 'رواتب معفاة من الضرائب • SAR 300-400K لمهندسي AI' : 'Tax-free salaries • SAR 300-400K for AI engineers'}</p>
                </CardContent>
              </Card>
              
              <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-green">
                <CardContent className="p-6">
                  <h4 className="font-heading font-black text-xl text-foreground mb-2">{isAr ? '🇮🇳 الهند' : '🇮🇳 India'}</h4>
                  <p className="font-body text-sm text-foreground/90">{isAr ? 'أسرع نمو توظيف AI عالمياً (52%)' : 'Fastest AI hiring growth globally (52%)'}</p>
                </CardContent>
              </Card>
              
              <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow">
                <CardContent className="p-6">
                  <h4 className="font-heading font-black text-xl text-foreground mb-2">{isAr ? '🇺🇸 أمريكا' : '🇺🇸 USA'}</h4>
                  <p className="font-body text-sm text-foreground/90">{isAr ? 'أكبر سوق وظائف AI (7,000+ وظيفة)' : 'Largest AI job market (7,000+ open positions)'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-lg mx-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground text-center py-6">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-foreground" />
              <CardTitle className="font-black text-xl md:text-2xl uppercase">
                {isSubscribed
                  ? (isAr ? "تم الاشتراك! 🎉" : "You're In! 🎉")
                  : (isAr ? "احصل على المزيد من النصائح والتحديثات" : "Get More Tips & Updates")
                }
              </CardTitle>
              {!isSubscribed && (
                <p className="font-body text-sm text-foreground/80 mt-2">
                  {isAr
                    ? "انضم إلى المجتمع الذي يتعلم بناء التطبيقات بالذكاء الاصطناعي"
                    : "Join the community learning to build with AI"
                  }
                </p>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {isSubscribed ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
                  <p className="font-body text-lg font-semibold text-foreground">
                    {isAr
                      ? "شكراً لانضمامك! تحقق من بريدك الإلكتروني للمزيد من الموارد."
                      : "Thanks for joining! Check your inbox for more resources."
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {!contactMethod && (
                    <div className="space-y-3">
                      <Button
                        onClick={() => setContactMethod('email')}
                        className="w-full bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        {isAr ? "اشترك بالبريد الإلكتروني" : "Subscribe with Email"}
                      </Button>
                      <Button
                        onClick={() => setContactMethod('whatsapp')}
                        className="w-full bg-accent-green text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base py-5 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {isAr ? "انضم لتحديثات واتساب" : "Join WhatsApp Updates"}
                      </Button>
                    </div>
                  )}

                  {contactMethod && (
                    <div className="space-y-4">
                      <div>
                        <label className={`font-bold text-sm uppercase mb-2 block ${isAr ? 'text-right' : 'text-left'}`}>
                          {contactMethod === 'email'
                            ? (isAr ? 'بريدك الإلكتروني' : 'Your Email')
                            : (isAr ? 'رقم واتساب' : 'WhatsApp Number')
                          }
                        </label>
                        <Input
                          type={contactMethod === 'email' ? 'email' : 'tel'}
                          placeholder={contactMethod === 'email'
                            ? (isAr ? 'your@email.com' : 'your@email.com')
                            : (isAr ? '+966 12 345 6789' : '+1 234 567 8900')
                          }
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold text-base py-5"
                          dir={contactMethod === 'email' ? 'ltr' : 'ltr'}
                        />
                      </div>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !contactValue.trim()}
                        className="w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base py-5 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                      >
                        {isSubmitting
                          ? (isAr ? 'جاري الاشتراك...' : 'Subscribing...')
                          : (isAr ? 'اشترك ←' : 'Subscribe →')
                        }
                      </Button>
                      <button
                        onClick={() => { setContactMethod(null); setContactValue(''); }}
                        className="w-full text-sm font-medium text-foreground/60 hover:text-foreground"
                      >
                        {isAr ? 'اختر طريقة أخرى →' : '← Choose different method'}
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-center text-foreground/60">
                    {isAr ? '🔒 بدون إزعاج. إلغاء الاشتراك في أي وقت.' : '🔒 No spam. Unsubscribe anytime.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 border-t-4 border-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-xl font-bold mb-2">Mentorna®</p>
          <p className="font-body text-sm text-background/70 mb-4">
            {isAr ? 'تمكين الجيل القادم من بناة الذكاء الاصطناعي' : 'Empowering the next generation of AI builders'}
          </p>
          <p className="font-body text-xs text-background/50 mb-4">{isAr ? 'تابعني 👇' : 'Follow me 👇'}</p>
          <div className="flex justify-center gap-6">
            <a href="https://www.tiktok.com/@ahmed.ezzat4695" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent-yellow transition-colors font-medium">TikTok</a>
            <a href="https://www.instagram.com/ahmedezzat_fi" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent-yellow transition-colors font-medium">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillsIn2026;
