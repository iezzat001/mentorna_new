
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BarChart3, Code, Save } from 'lucide-react';

const TrackingAnalysisManager = () => {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [metaPixelId, setMetaPixelId] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing tracking codes from localStorage
  useEffect(() => {
    const savedGA = localStorage.getItem('google_analytics_id');
    const savedMeta = localStorage.getItem('meta_pixel_id');
    const savedCustom = localStorage.getItem('custom_tracking_code');
    
    if (savedGA) setGoogleAnalyticsId(savedGA);
    if (savedMeta) setMetaPixelId(savedMeta);
    if (savedCustom) setCustomCode(savedCustom);
  }, []);

  const handleSaveGoogleAnalytics = () => {
    setIsSaving(true);
    try {
      if (googleAnalyticsId.trim()) {
        localStorage.setItem('google_analytics_id', googleAnalyticsId.trim());
        
        // Remove existing GA script if any
        const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
        const existingInlineScript = document.querySelector('#ga-inline-script');
        if (existingScript) existingScript.remove();
        if (existingInlineScript) existingInlineScript.remove();
        
        // Add new GA script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId.trim()}`;
        script.async = true;
        document.head.appendChild(script);
        
        const inlineScript = document.createElement('script');
        inlineScript.id = 'ga-inline-script';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId.trim()}');
        `;
        document.head.appendChild(inlineScript);
        
        toast.success('Google Analytics tracking code updated successfully!');
      } else {
        localStorage.removeItem('google_analytics_id');
        const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
        const existingInlineScript = document.querySelector('#ga-inline-script');
        if (existingScript) existingScript.remove();
        if (existingInlineScript) existingInlineScript.remove();
        toast.success('Google Analytics tracking code removed successfully!');
      }
    } catch (error) {
      toast.error('Failed to update Google Analytics code');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveMetaPixel = () => {
    setIsSaving(true);
    try {
      if (metaPixelId.trim()) {
        localStorage.setItem('meta_pixel_id', metaPixelId.trim());
        
        // Remove existing Meta Pixel script if any
        const existingScript = document.querySelector('#meta-pixel-script');
        if (existingScript) existingScript.remove();
        
        // Add new Meta Pixel script
        const script = document.createElement('script');
        script.id = 'meta-pixel-script';
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId.trim()}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
        
        toast.success('Meta Pixel tracking code updated successfully!');
      } else {
        localStorage.removeItem('meta_pixel_id');
        const existingScript = document.querySelector('#meta-pixel-script');
        if (existingScript) existingScript.remove();
        toast.success('Meta Pixel tracking code removed successfully!');
      }
    } catch (error) {
      toast.error('Failed to update Meta Pixel code');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCustomCode = () => {
    setIsSaving(true);
    try {
      if (customCode.trim()) {
        localStorage.setItem('custom_tracking_code', customCode.trim());
        
        // Remove existing custom script if any
        const existingScript = document.querySelector('#custom-tracking-script');
        if (existingScript) existingScript.remove();
        
        // Add new custom script
        const script = document.createElement('script');
        script.id = 'custom-tracking-script';
        script.innerHTML = customCode.trim();
        document.head.appendChild(script);
        
        toast.success('Custom tracking code updated successfully!');
      } else {
        localStorage.removeItem('custom_tracking_code');
        const existingScript = document.querySelector('#custom-tracking-script');
        if (existingScript) existingScript.remove();
        toast.success('Custom tracking code removed successfully!');
      }
    } catch (error) {
      toast.error('Failed to update custom tracking code');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl font-black uppercase text-foreground">
          Tracking & Analysis
        </h1>
        <p className="font-body text-lg font-semibold text-foreground/70">
          Manage your website tracking and analytics codes
        </p>
      </div>

      <Tabs defaultValue="google-analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-accent-yellow border-4 border-foreground">
          <TabsTrigger 
            value="google-analytics" 
            className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Google Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="meta-pixel" 
            className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Code className="h-4 w-4 mr-2" />
            Meta Pixel
          </TabsTrigger>
          <TabsTrigger 
            value="custom" 
            className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Code className="h-4 w-4 mr-2" />
            Custom Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="google-analytics" className="space-y-4">
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-blue border-b-4 border-foreground">
              <CardTitle className="font-black text-2xl uppercase flex items-center">
                <BarChart3 className="h-6 w-6 mr-2" />
                Google Analytics Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="font-bold text-sm uppercase">
                  Google Analytics Measurement ID
                </Label>
                <Input
                  placeholder="G-XXXXXXXXXX"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                />
                <p className="text-xs font-semibold text-foreground/70">
                  Enter your Google Analytics 4 Measurement ID (starts with G-)
                </p>
              </div>
              <Button
                onClick={handleSaveGoogleAnalytics}
                disabled={isSaving}
                className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Google Analytics'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta-pixel" className="space-y-4">
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-purple border-b-4 border-foreground">
              <CardTitle className="font-black text-2xl uppercase flex items-center">
                <Code className="h-6 w-6 mr-2" />
                Meta Pixel Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="font-bold text-sm uppercase">
                  Meta Pixel ID
                </Label>
                <Input
                  placeholder="123456789012345"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                />
                <p className="text-xs font-semibold text-foreground/70">
                  Enter your Meta Pixel ID (15-digit number)
                </p>
              </div>
              <Button
                onClick={handleSaveMetaPixel}
                disabled={isSaving}
                className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Meta Pixel'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
              <CardTitle className="font-black text-2xl uppercase flex items-center">
                <Code className="h-6 w-6 mr-2" />
                Custom Tracking Code
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="font-bold text-sm uppercase">
                  Custom JavaScript Code
                </Label>
                <Textarea
                  placeholder="// Enter your custom tracking JavaScript code here..."
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  rows={10}
                  className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono text-sm"
                />
                <p className="text-xs font-semibold text-foreground/70">
                  Add any custom tracking or analytics JavaScript code
                </p>
              </div>
              <Button
                onClick={handleSaveCustomCode}
                disabled={isSaving}
                className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Custom Code'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackingAnalysisManager;
