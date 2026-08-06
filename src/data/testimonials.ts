export const S3_BASE =
  'https://mentorna-testimonials.s3.amazonaws.com/workshop-helsinki';

export const workshopVideoUrl = `${S3_BASE}/video-testimonial.MP4`;
export const mariamVideoUrl = 'https://d2mp3ttz3u5gci.cloudfront.net/mariam.MOV';
export const mariamThumbnailUrl =
  'https://d2mp3ttz3u5gci.cloudfront.net/mariam_thumbnail.png';
export const workshopVideoPoster = `${S3_BASE}/20260604_182905.JPEG`;

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
  source: string;
  linkedin?: string;
  highlight: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Matti Tuominen',
    role: 'Senior Advisor at Zadam Oy',
    rating: 5,
    quote:
      'This was perhaps the most interesting workshop I have ever attended during the last 40 years.',
    source: 'Luma Review',
    linkedin: 'https://www.linkedin.com/in/matti-tuominen-b18680',
    highlight: true,
  },
  {
    id: 2,
    name: 'Rudransh Khurana',
    role: 'Pre-DP Student, SYK IB',
    rating: 5,
    quote:
      "Truly one of the most helpful and educational sessions I've ever attended. Most workshops involve a lot of theory with very little action.",
    source: 'Instagram DM',
    highlight: false,
  },
  {
    id: 3,
    name: 'Loan Cindy Tran',
    role: 'B2B Market Entry Specialist',
    rating: 5,
    quote:
      'I walked away with a live landing page ready to capture waitlist sign-ups. Getting that level of clarity and technical output in a single evening is invaluable.',
    source: 'LinkedIn',
    highlight: true,
  },
  {
    id: 4,
    name: 'Bambi Dang',
    role: 'Founder @ FunFox, AI Collective',
    rating: 5,
    quote:
      "Ahmed Ezzat dropped the best workshop on building startups! Hands down! A 4-hour workshop felt so short when there's so much juice.",
    source: 'LinkedIn',
    highlight: false,
  },
  {
    id: 5,
    name: 'Sneh Patel',
    role: 'Pre-IB Student, HSYK',
    rating: 5,
    quote:
      '5 high schoolers. No prior startup experience. One raw idea. The event provided practical insights into AI tools, vibe coding, and the process of turning an idea into a startup.',
    source: 'LinkedIn',
    highlight: false,
  },
  {
    id: 6,
    name: 'Lily',
    role: 'Workshop Participant',
    rating: 5,
    quote: 'Thank you very much for the amazing vibe coding session!',
    source: 'Direct Message',
    highlight: false,
  },
];

export const eventPhotos = [
  { src: `${S3_BASE}/20260604_174214.JPEG`, alt: 'Workshop participants at Helsinki XR Center' },
  { src: `${S3_BASE}/20260604_182905.JPEG`, alt: 'Ahmed Ezzat presenting at the workshop' },
  { src: `${S3_BASE}/20260604_185329.JPEG`, alt: 'Participants building their prototypes' },
  { src: `${S3_BASE}/20260604_211945(0).JPEG`, alt: 'Workshop group session' },
  { src: `${S3_BASE}/2c5265ca-bdcc-44f4-99e9-a33a8cc8c9b9.JPG`, alt: 'Team Unprompted presenting' },
  { src: `${S3_BASE}/IMG_9530.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9531.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9533.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9535.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9557.jpg`, alt: 'Workshop moment' },
  { src: `${S3_BASE}/IMG_9558.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9559.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9702.jpg`, alt: 'Written feedback' },
  { src: `${S3_BASE}/IMG_9710.jpg`, alt: 'LinkedIn post about workshop' },
  { src: `${S3_BASE}/IMG_9711.jpg`, alt: 'LinkedIn post about workshop' },
  { src: `${S3_BASE}/IMG_9712.jpg`, alt: 'LinkedIn post about workshop' },
  { src: `${S3_BASE}/IMG_9713.jpg`, alt: 'LinkedIn post about workshop' },
];
