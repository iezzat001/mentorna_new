
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Code, Save } from 'lucide-react';

interface CustomCodeTabProps {
  customCode: string;
  setCustomCode: (code: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

const CustomCodeTab = ({
  customCode,
  setCustomCode,
  onSave,
  isSaving
}: CustomCodeTabProps) => {
  return (
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
          onClick={onSave}
          disabled={isSaving}
          className="bg-accent-green hover:bg-accent-green/90 text-foreground font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save & Reload'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomCodeTab;
