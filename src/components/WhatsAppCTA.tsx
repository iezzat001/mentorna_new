import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { whatsappUrl, WHATSAPP_MESSAGES } from '@/lib/whatsapp';

interface WhatsAppCTAProps {
  /** Pre-filled WhatsApp message. Defaults to the general enquiry text. */
  message?: string;
  /** A single element (usually a Button) that becomes the trigger. */
  children: React.ReactNode;
}

/**
 * Wraps any trigger element so clicking it opens a WhatsApp chat with Ahmed.
 * Uses Slot so the child keeps its own markup and styling.
 */
const WhatsAppCTA = ({ message = WHATSAPP_MESSAGES.general, children }: WhatsAppCTAProps) => (
  <Slot
    onClick={() =>
      window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    }
  >
    {children}
  </Slot>
);

export default WhatsAppCTA;
