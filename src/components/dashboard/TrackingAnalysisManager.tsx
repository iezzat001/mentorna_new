
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Code } from 'lucide-react';
import GoogleAnalyticsTab from './tracking/GoogleAnalyticsTab';
import MetaPixelTab from './tracking/MetaPixelTab';
import CustomCodeTab from './tracking/CustomCodeTab';
import TrackingStatus from './tracking/TrackingStatus';
import { useTrackingLogic } from './tracking/useTrackingLogic';

const TrackingAnalysisManager = () => {
  const {
    googleAnalyticsId,
    setGoogleAnalyticsId,
    metaPixelId,
    setMetaPixelId,
    customCode,
    setCustomCode,
    isSaving,
    handleSaveGoogleAnalytics,
    handleSaveMetaPixel,
    handleSaveCustomCode,
    testGoogleAnalytics,
    testMetaPixel,
    isGoogleAnalyticsActive,
    isMetaPixelActive
  } = useTrackingLogic();

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
          <GoogleAnalyticsTab
            googleAnalyticsId={googleAnalyticsId}
            setGoogleAnalyticsId={setGoogleAnalyticsId}
            onSave={handleSaveGoogleAnalytics}
            onTest={testGoogleAnalytics}
            isSaving={isSaving}
            isActive={isGoogleAnalyticsActive}
          />
        </TabsContent>

        <TabsContent value="meta-pixel" className="space-y-4">
          <MetaPixelTab
            metaPixelId={metaPixelId}
            setMetaPixelId={setMetaPixelId}
            onSave={handleSaveMetaPixel}
            onTest={testMetaPixel}
            isSaving={isSaving}
            isActive={isMetaPixelActive}
          />
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <CustomCodeTab
            customCode={customCode}
            setCustomCode={setCustomCode}
            onSave={handleSaveCustomCode}
            isSaving={isSaving}
          />
        </TabsContent>
      </Tabs>
      
      <TrackingStatus
        isGoogleAnalyticsActive={isGoogleAnalyticsActive}
        isMetaPixelActive={isMetaPixelActive}
        hasCustomCode={!!customCode}
      />
    </div>
  );
};

export default TrackingAnalysisManager;
