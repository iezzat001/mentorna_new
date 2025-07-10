
import React from 'react';
import { Button } from '@/components/ui/button';
import ContactDialog from './ContactDialog';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="font-heading text-2xl font-light tracking-wide">
              iLab®
            </div>
            <p className="font-body text-background/80 leading-relaxed">
              Transform your child's future with our cutting-edge AI education platform.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase">
              Quick Links
            </h3>
            <div className="space-y-2">
              <a href="#program" className="block font-body text-background/80 hover:text-background transition-colors">
                Program Overview
              </a>
              <a href="#pricing" className="block font-body text-background/80 hover:text-background transition-colors">
                Pricing
              </a>
              <a href="#founders" className="block font-body text-background/80 hover:text-background transition-colors">
                Our Team
              </a>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase">
              Get in Touch
            </h3>
            <p className="font-body text-background/80">
              Have questions? We'd love to hear from you.
            </p>
            <ContactDialog>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground font-bold uppercase shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Contact Us
              </Button>
            </ContactDialog>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="font-body text-background/60 text-sm">
            © 2024 iLab® AI Education Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
