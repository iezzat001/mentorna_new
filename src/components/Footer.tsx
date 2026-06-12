
import React from 'react';
import { Button } from '@/components/ui/button';
import ContactDialog from './ContactDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import { Mail, ExternalLink } from 'lucide-react';

const socials = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@ahmed.ezzat__',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.51a8.16 8.16 0 0 0 4.77 1.52V6.69a4.85 4.85 0 0 1-1.84 0z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ahmed.ezzat.ai',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmedezzat001',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t-4 border-foreground">
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Brand + tagline */}
          <div className="text-center md:text-left">
            <div className="font-heading text-3xl md:text-4xl font-black tracking-wide mb-2">
              Mentorna®
            </div>
            <p className="font-body text-background/70 text-sm md:text-base max-w-md mx-auto md:mx-0">
              Helping founders validate ideas, build MVPs, and launch with
              repeatable AI-powered execution systems.
            </p>
          </div>

          {/* CTA + socials */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <ContactDialog>
              <Button className="bg-accent-yellow text-foreground border-2 border-background shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-black text-sm md:text-base py-4 px-5 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </ContactDialog>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 border-2 border-background text-background hover:bg-background hover:text-foreground flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-background/20 mt-8 md:mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <p className="font-body text-background/60 text-center sm:text-left">
            © 2026 Mentorna®. All rights reserved.
          </p>
          <PrivacyPolicyDialog>
            <button className="font-body text-background/60 hover:text-background transition-colors underline-offset-2 hover:underline">
              Terms & Privacy
            </button>
          </PrivacyPolicyDialog>
        </div>
      </div>
    </footer>
  );
};

export default Footer;