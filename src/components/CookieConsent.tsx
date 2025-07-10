
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Settings, Shield, BarChart3 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      // Load tracking scripts based on saved preferences
      if (savedPreferences.analytics) {
        loadAnalyticsScripts();
      }
    }
  }, []);

  const loadAnalyticsScripts = () => {
    // Load Google Analytics
    const gaId = localStorage.getItem('google_analytics_id');
    if (gaId && gaId.trim()) {
      // Create and append gtag script
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId.trim()}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) { window.dataLayer?.push(args); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId.trim(), {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
      
      console.log('Google Analytics loaded with consent:', gaId.trim());
    }

    // Load Meta Pixel
    const metaPixelId = localStorage.getItem('meta_pixel_id');
    if (metaPixelId && metaPixelId.trim()) {
      !function(f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', metaPixelId.trim());
      window.fbq('track', 'PageView');
      
      console.log('Meta Pixel loaded with consent:', metaPixelId.trim());
    }

    // Load custom tracking code
    const customCode = localStorage.getItem('custom_tracking_code');
    if (customCode && customCode.trim()) {
      try {
        eval(customCode.trim());
        console.log('Custom tracking code executed with consent');
      } catch (error) {
        console.error('Error executing custom tracking code:', error);
      }
    }
  };

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookie_consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
    loadAnalyticsScripts();
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookie_consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
    
    if (preferences.analytics) {
      loadAnalyticsScripts();
    }
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-background mx-auto max-w-4xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold mb-2">
                  We Value Your Privacy
                </h3>
                <p className="font-body text-sm text-foreground/80 mb-4 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze our traffic, and for marketing purposes. 
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our Privacy Policy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary/90 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                  >
                    Reject All
                  </Button>
                  <Dialog open={showSettings} onOpenChange={setShowSettings}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-heading text-2xl font-black uppercase">
                          Cookie Preferences
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Necessary Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-base">Necessary Cookies</h4>
                              <p className="text-sm text-foreground/70">
                                Required for the website to function properly. Cannot be disabled.
                              </p>
                            </div>
                            <Switch checked={true} disabled />
                          </div>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-base">Analytics Cookies</h4>
                              <p className="text-sm text-foreground/70">
                                Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                              </p>
                            </div>
                            <Switch
                              checked={preferences.analytics}
                              onCheckedChange={(checked) => updatePreference('analytics', checked)}
                            />
                          </div>
                        </div>

                        {/* Marketing Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-base">Marketing Cookies</h4>
                              <p className="text-sm text-foreground/70">
                                Used to track visitors across websites to display relevant and engaging advertisements.
                              </p>
                            </div>
                            <Switch
                              checked={preferences.marketing}
                              onCheckedChange={(checked) => updatePreference('marketing', checked)}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={handleSavePreferences}
                            className="bg-primary hover:bg-primary/90 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                          >
                            Save Preferences
                          </Button>
                          <Button
                            onClick={() => setShowSettings(false)}
                            variant="outline"
                            className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CookieConsent;
