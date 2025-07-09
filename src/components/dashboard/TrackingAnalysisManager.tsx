
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BarChart3, Code, Save, CheckCircle, AlertCircle } from 'lucide-react';

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

  const reloadPageForTracking = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSaveGoogleAnalytics = () => {
    setIsSaving(true);
    try {
      if (googleAnalyticsId.trim()) {
        // Validate Google Analytics ID format
        if (!googleAnalyticsId.trim().match(/^G-[A-Z0-9]+$/)) {
          toast.error('Invalid Google Analytics ID format. Should be G-XXXXXXXXXX');
          setIsSaving(false);
          return;
        }
        
        localStorage.setItem('google_analytics_id', googleAnalyticsId.trim());
        toast.success('Google Analytics tracking code saved! The page will reload to activate tracking.');
        reloadPageForTracking();
      } else {
        localStorage.removeItem('google_analytics_id');
        toast.success('Google Analytics tracking code removed! The page will reload.');
        reloadPageForTracking();
      }
    } catch (error) {
      toast.error('Failed to update Google Analytics code');
      setIsSaving(false);
    }
  };

  const handleSaveMetaPixel = () => {
    setIsSaving(true);
    try {
      if (metaPixelId.trim()) {
        // Validate Meta Pixel ID format (should be numeric)
        if (!metaPixelId.trim().match(/^\d{15,16}$/)) {
          toast.error('Invalid Meta Pixel ID format. Should be a 15-16 digit number');
          setIsSaving(false);
          return;
        }
        
        localStorage.setItem('meta_pixel_id', metaPixelId.trim());
        toast.success('Meta Pixel tracking code saved! The page will reload to activate tracking.');
        reloadPageForTracking();
      } else {
        localStorage.removeItem('meta_pixel_id');
        toast.success('Meta Pixel tracking code removed! The page will reload.');
        reloadPageForTracking();
      }
    } catch (error) {
      toast.error('Failed to update Meta Pixel code');
      setIsSaving(false);
    }
  };

  const handleSaveCustomCode = () => {
    setIsSaving(true);
    try {
      if (customCode.trim()) {
        localStorage.setItem('custom_tracking_code', customCode.trim());
        toast.success('Custom tracking code saved! The page will reload to activate tracking.');
        reloadPageForTracking();
      } else {
        localStorage.removeItem('custom_tracking_code');
        toast.success('Custom tracking code removed! The page will reload.');
        reloadPageForTracking();
      }
    } catch (error) {
      toast.error('Failed to update custom tracking code');
      setIsSaving(false);
    }
  };

  const testGoogleAnalytics = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'test_event', {
        event_category: 'admin_test',
        event_label: 'tracking_test',
        value: 1
      });
      toast.success('Test event sent to Google Analytics! Check your GA dashboard in a few minutes.');
    } else {
      toast.error('Google Analytics is not loaded. Please save your GA ID first.');
    }
  };

  const testMetaPixel = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AdminTest', {
        content_name: 'tracking_test',
        source: 'admin_panel'
      });
      toast.success('Test event sent to Meta Pixel! Check your Facebook Events Manager.');
    } else {
      toast.error('Meta Pixel is not loaded. Please save your Pixel ID first.');
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
                {googleAnalyticsId && typeof window.gtag === 'function' && (
                  <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
                )}
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
                {googleAnalyticsId && typeof window.gtag === 'function' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Google Analytics is active and tracking
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveGoogleAnalytics}
                  disabled={isSaving}
                  className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save & Reload'}
                </Button>
                {googleAnalyticsId && typeof window.gtag === 'function' && (
                  <Button
                    onClick={testGoogleAnalytics}
                    variant="outline"
                    className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                  >
                    Test Tracking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta-pixel" className="space-y-4">
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-purple border-b-4 border-foreground">
              <CardTitle className="font-black text-2xl uppercase flex items-center">
                <Code className="h-6 w-6 mr-2" />
                Meta Pixel Configuration
                {metaPixelId && typeof window.fbq === 'function' && (
                  <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
                )}
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
                  Enter your Meta Pixel ID (15-16 digit number)
                </p>
                {metaPixelId && typeof window.fbq === 'function' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Meta Pixel is active and tracking
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveMetaPixel}
                  disabled={isSaving}
                  className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save & Reload'}
                </Button>
                {metaPixelId && typeof window.fbq === 'function' && (
                  <Button
                    onClick={testMetaPixel}
                    variant="outline"
                    className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                  >
                    Test Tracking
                  </Button>
                )}
              </div>
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
                {isSaving ? 'Saving...' : 'Save & Reload'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Status Information */}
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-green border-b-4 border-foreground">
          <CardTitle className="font-black text-2xl uppercase">
            Tracking Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              {googleAnalyticsId && typeof window.gtag === 'function' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              <span className="font-semibold">
                Google Analytics: {googleAnalyticsId && typeof window.gtag === 'function' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {metaPixelId && typeof window.fbq === 'function' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              <span className="font-semibold">
                Meta Pixel: {metaPixelId && typeof window.fbq === 'function' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {customCode ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              <span className="font-semibold">
                Custom Code: {customCode ? 'Configured' : 'Not Set'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingAnalysisManager;
