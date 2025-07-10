
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyDialogProps {
  children: React.ReactNode;
}

const PrivacyPolicyDialog = ({ children }: PrivacyPolicyDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-black uppercase">
            Privacy Policy & Terms of Service
          </DialogTitle>
          <DialogDescription className="font-body text-foreground/80">
            Last updated: January 2025
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 font-body text-foreground">
            {/* Privacy Policy Section */}
            <div>
              <h2 className="font-heading text-xl font-bold uppercase mb-4">Privacy Policy</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Information We Collect</h3>
                  <p className="mb-2">We collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Personal Information:</strong> Name, email address, phone number when you contact us or sign up for our services</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, and IP address</li>
                    <li><strong>Cookies:</strong> We use essential cookies to improve your experience</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">2. How We Use Your Information</h3>
                  <p className="mb-2">We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide and improve our AI education services</li>
                    <li>Respond to your inquiries and customer support requests</li>
                    <li>Send you important updates about our services</li>
                    <li>Analyze website usage to improve user experience</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">3. Information Sharing</h3>
                  <p className="mb-2">We do not sell, trade, or rent your personal information. We may share information only in these circumstances:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                    <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">4. Data Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">5. Your Rights (GDPR & CCPA Compliance)</h3>
                  <p className="mb-2">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Access:</strong> Request copies of your personal data</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Objection:</strong> Object to processing of your personal data</li>
                    <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-2">To exercise these rights, contact us using the information provided below.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">6. Data Retention</h3>
                  <p>We retain your personal information only as long as necessary for the purposes outlined in this policy or as required by law. Contact form submissions are kept for 2 years unless you request earlier deletion.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">7. International Data Transfers</h3>
                  <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.</p>
                </div>
            </div>

            {/* Terms of Service Section */}
            <div className="border-t-2 border-foreground pt-6">
              <h2 className="font-heading text-xl font-bold uppercase mb-4">Terms of Service</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h3>
                  <p>By accessing and using iLab® AI Education Platform, you accept and agree to be bound by these terms and conditions.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">2. Description of Service</h3>
                  <p>iLab® provides AI education services for children, including coding courses, workshops, and educational content. Our services are designed to teach AI and programming concepts to young learners.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">3. User Responsibilities</h3>
                  <p className="mb-2">You agree to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not interfere with the proper functioning of our services</li>
                    <li>Supervise children's use of our educational platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">4. Intellectual Property</h3>
                  <p>All content, materials, and intellectual property on our platform are owned by iLab® or our licensors. You may not reproduce, distribute, or create derivative works without our written permission.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">5. Limitation of Liability</h3>
                  <p>To the maximum extent permitted by law, iLab® shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">6. Termination</h3>
                  <p>We reserve the right to terminate or suspend access to our services at any time, with or without cause, and with or without notice.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">7. Changes to Terms</h3>
                  <p>We may modify these terms at any time. We will notify users of any material changes via email or through our website.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">8. Governing Law</h3>
                  <p>These terms are governed by the laws of the jurisdiction in which iLab® operates, without regard to conflict of law principles.</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="border-t-2 border-foreground pt-6">
              <h2 className="font-heading text-xl font-bold uppercase mb-4">Contact Information</h2>
              <p className="mb-2">For questions about this Privacy Policy or Terms of Service, please contact us:</p>
              <ul className="space-y-1">
                <li><strong>Email:</strong> privacy@ilab-ai.com</li>
                <li><strong>Address:</strong> iLab® AI Education Platform</li>
                <li><strong>Phone:</strong> Available through our contact form</li>
              </ul>
              <p className="mt-4 text-sm text-foreground/70">
                This policy complies with GDPR (EU), CCPA (California), COPPA (Children's Online Privacy Protection Act), and other applicable privacy regulations.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
