export const WHATSAPP_NUMBER = '358414819241';

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  bootcamp:
    "Hi Ahmed, I'd like to know more about the AI Entrepreneurship Bootcamp.",
  bootcampSpot:
    "Hi Ahmed, I'd like to secure a spot in the AI Entrepreneurship Bootcamp.",
  mentorship:
    "Hi Ahmed, I'm interested in your 1:1 mentorship program. I'd like to learn more.",
  consultation: "Hi Ahmed, I'd like to book a 1:1 consultation call with you.",
  workshop:
    'Hi Ahmed, I would like to reserve a seat in the Vibe Coding 0 → 1 workshop. When is the next date?',
  comingSoon:
    "Hi Ahmed, I'd like early access to the upcoming Mentorna programs.",
  general: 'Hi Ahmed, I have a question about Mentorna.',
} as const;
