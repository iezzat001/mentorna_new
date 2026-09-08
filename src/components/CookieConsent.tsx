import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import PrivacyPolicyDialog from '@/components/PrivacyPolicyDialog';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [measurementId, setMeasurementId] = useState('');

  useEffect(() => {
    const gaId = localStorage.getItem('google_analytics_id') || '';
    setMeasurementId(gaId);
  }, []);

  const { isInitialized, updateConsent, trackEvent } = useGoogleAnalytics({
    measurementId: measurementId.trim(),
    debugMode: process.env.NODE_ENV === 'development',
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);

        if (isInitialized && savedPreferences.analytics) {
          updateConsent({
            analytics_storage: 'granted',
            ad_storage: savedPreferences.marketing ? 'granted' : 'denied',
          });
        }
      } catch (error) {
        console.warn('Invalid cookie consent data, clearing...', error);
        localStorage.removeItem('cookie_consent');
        setShowBanner(true);
      }
    }
  }, [isInitialized, updateConsent]);

  const loadAdditionalTrackingScripts = () => {
    const metaPixelId = localStorage.getItem('meta_pixel_id');
    if (metaPixelId && metaPixelId.trim()) {
      (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
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
        s.parentNode!.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);

      if (window.fbq) {
        window.fbq('init', metaPixelId.trim());
        window.fbq('track', 'PageView');
      }
    }

    const customCode = localStorage.getItem('custom_tracking_code');
    if (customCode && customCode.trim()) {
      try {
        const script = document.createElement('script');
        script.textContent = customCode.trim();
        script.type = 'text/javascript';
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error executing custom tracking code:', error);
      }
    }
  };

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    setPreferences(newPreferences);
    localStorage.setItem('cookie_consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());

    updateConsent({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });

    loadAdditionalTrackingScripts();

    trackEvent('cookie_consent', {
      consent_type: 'accept_all',
      analytics: true,
      marketing: true,
    });

    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    setPreferences(newPreferences);
    localStorage.setItem('cookie_consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());

    updateConsent({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    trackEvent('cookie_consent', {
      consent_type: 'reject_all',
      analytics: false,
      marketing: false,
    });

    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());

    updateConsent({
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
    });

    if (preferences.analytics || preferences.marketing) {
      loadAdditionalTrackingScripts();
    }

    trackEvent('cookie_consent', {
      consent_type: 'custom',
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });

    setShowBanner(false);
    setShowSettings(false);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return;
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Thin editorial consent bar — matches /build + /community cream system */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-3 md:p-4">
        <div
          className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl px-4 py-3 shadow-[0_18px_50px_-24px_rgba(60,30,10,0.45)] ring-1 ring-[#1c100e]/10 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-3.5"
          style={{
            background: 'linear-gradient(180deg, #FFFCFA 0%, #F7E9D6 100%)',
          }}
        >
          <p className="min-w-0 flex-1 font-heading text-[13px] font-light leading-snug text-[hsl(0,0%,10%)]/75 md:text-sm">
            We use cookies to improve the site and measure what works.{' '}
            <PrivacyPolicyDialog>
              <button
                type="button"
                className="underline decoration-[#1c100e]/25 underline-offset-4 transition-opacity hover:opacity-70"
              >
                Privacy
              </button>
            </PrivacyPolicyDialog>
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRejectAll}
              className="rounded-full px-3.5 py-2 font-heading text-xs font-medium tracking-wide text-[hsl(0,0%,10%)]/70 transition-colors hover:bg-[#1c100e]/5 hover:text-[hsl(0,0%,10%)] md:text-[13px]"
            >
              Reject
            </button>

            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-heading text-xs font-medium tracking-wide text-[hsl(0,0%,10%)]/70 ring-1 ring-[#1c100e]/12 transition-colors hover:bg-[#1c100e]/5 hover:text-[hsl(0,0%,10%)] md:text-[13px]"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-[22px] border-0 bg-[#FFFCFA] p-6 shadow-[0_28px_70px_-28px_rgba(60,30,10,0.45)] ring-1 ring-[#1c100e]/10 sm:p-7">
                <DialogHeader>
                  <DialogTitle className="font-heading text-xl font-light tracking-tight text-[hsl(0,0%,10%)]">
                    Cookie preferences
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-5 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-sm font-medium text-[hsl(0,0%,10%)]">
                        Necessary
                      </p>
                      <p className="mt-1 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
                        Required for the site to work. Always on.
                      </p>
                    </div>
                    <Switch checked disabled />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-sm font-medium text-[hsl(0,0%,10%)]">
                        Analytics
                      </p>
                      <p className="mt-1 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
                        Helps us see what people use, anonymously.
                      </p>
                    </div>
                    <Switch
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => updatePreference('analytics', checked)}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-sm font-medium text-[hsl(0,0%,10%)]">
                        Marketing
                      </p>
                      <p className="mt-1 font-heading text-sm font-light text-[hsl(0,0%,10%)]/60">
                        Used for relevant ads across sites.
                      </p>
                    </div>
                    <Switch
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => updatePreference('marketing', checked)}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleSavePreferences}
                      className="rounded-full bg-[hsl(0,0%,10%)] px-5 py-2.5 font-heading text-sm font-medium text-[#F7E9D6] transition-transform hover:scale-[1.02]"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSettings(false)}
                      className="rounded-full px-5 py-2.5 font-heading text-sm font-medium text-[hsl(0,0%,10%)]/65 transition-colors hover:bg-[#1c100e]/5"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-full bg-[hsl(0,0%,10%)] px-4 py-2 font-heading text-xs font-medium tracking-wide text-[#F7E9D6] transition-transform hover:scale-[1.03] md:px-5 md:text-[13px]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
