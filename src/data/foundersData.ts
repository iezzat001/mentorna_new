
export interface Founder {
  id: number;
  name: string;
  title: string;
  shortBio: string;
  extendedBio: string;
  image: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
  };
}

export const foundersData: Founder[] = [
  {
    id: 1,
    name: "Ahmed Ezzat",
    title: "AI Consultant & Serial Entrepreneur",
    shortBio: "For five years, I've merged my expertise in entrepreneurship and AI into educational initiatives for Arab communities.",
    extendedBio: "For five years, I've merged my expertise in entrepreneurship and AI into educational initiatives for Arab communities. I've helped students secure spots at top universities and launch innovative projects.",
    image: "https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur .png",
    socialMedia: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Islam Mosa",
    title: "Tech Entrepreneur, & 40 under 40 by HBJ",
    shortBio: "I believe our children have the brilliance to not just adapt, but to lead.",
    extendedBio: "I believe our children have the brilliance to not just adapt, but to lead. My role is to help spark that.",
    image: "https://d2mp3ttz3u5gci.cloudfront.net/islam_entrepreneur .png",
    socialMedia: {
      linkedin: "#",
      twitter: "#"
    }
  }
];
