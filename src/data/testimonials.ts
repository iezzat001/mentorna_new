export const S3_BASE =
  'https://mentorna-testimonials.s3.amazonaws.com/workshop-helsinki';

/* Local pre-compressed WebP copies of the workshop photos.
 * The S3 originals are multi-megabyte JPEGs (poster alone was 3.35 MB),
 * which hurt LCP on /build. These WebP versions are served from /public.
 * Video files are large and still stream from S3 on demand. */
const PHOTO_BASE = '/workshop-helsinki';

export const workshopVideoUrl = `${S3_BASE}/video-testimonial.MP4`;
export const mariamVideoUrl = 'https://d2mp3ttz3u5gci.cloudfront.net/mariam.MOV';
export const mariamThumbnailUrl =
  'https://d2mp3ttz3u5gci.cloudfront.net/mariam_thumbnail.png';
export const workshopVideoPoster = `${PHOTO_BASE}/poster-182905.webp`;

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
  { src: `${PHOTO_BASE}/photo-174214.webp`,    alt: 'Workshop participants at Helsinki XR Center' },
  { src: `${PHOTO_BASE}/poster-182905.webp`,   alt: 'Ahmed Ezzat presenting at the workshop' },
  { src: `${PHOTO_BASE}/photo-185329.webp`,    alt: 'Participants building their prototypes' },
  { src: `${PHOTO_BASE}/photo-211945.webp`,    alt: 'Workshop group session' },
  { src: `${PHOTO_BASE}/photo-unprompted.webp`, alt: 'Team Unprompted presenting' },
  { src: `${PHOTO_BASE}/photo-IMG_9530.webp`,  alt: 'Written feedback' },
  { src: `${PHOTO_BASE}/photo-IMG_9533.webp`,  alt: 'Written feedback' },
  { src: `${PHOTO_BASE}/photo-IMG_9535.webp`,  alt: 'Written feedback' },
  { src: `${PHOTO_BASE}/photo-IMG_9557.webp`,  alt: 'Workshop moment' },
  { src: `${PHOTO_BASE}/photo-IMG_9558.webp`,  alt: 'Written feedback' },
  { src: `${PHOTO_BASE}/photo-IMG_9559.webp`,  alt: 'Written feedback' },
  { src: `${PHOTO_BASE}/photo-IMG_9702.webp`,  alt: 'Written feedback' },
  { src: `${PHOTO_BASE}/photo-IMG_9710.webp`,  alt: 'LinkedIn post about workshop' },
  { src: `${PHOTO_BASE}/photo-IMG_9711.webp`,  alt: 'LinkedIn post about workshop' },
  { src: `${PHOTO_BASE}/photo-IMG_9712.webp`,  alt: 'LinkedIn post about workshop' },
  { src: `${PHOTO_BASE}/photo-IMG_9713.webp`,  alt: 'LinkedIn post about workshop' },
];
