
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart3, Save, CheckCircle } from 'lucide-react';

interface GoogleAnalyticsTabProps {
  googleAnalyticsId: string;
  setGoogleAnalyticsId: (id: string) => void;
  onSave: () => void;
  onTest: () => void;
  isSaving: boolean;
  isActive: boolean;
}

const GoogleAnalyticsTab = ({
  googleAnalyticsId,
  setGoogleAnalyticsId,
  onSave,
  onTest,
  isSaving,
  isActive
}: GoogleAnalyticsTabProps) => {
  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-blue border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase flex items-center">
          <BarChart3 className="h-6 w-6 mr-2" />
          Google Analytics Configuration
          {isActive && (
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
          {isActive && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
              <CheckCircle className="h-4 w-4" />
              Google Analytics is active and tracking
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save & Reload'}
          </Button>
          {isActive && (
            <Button
              onClick={onTest}
              variant="outline"
              className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
            >
              Test Tracking
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleAnalyticsTab;
