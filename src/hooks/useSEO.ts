import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noindex?: boolean;
}

/**
 * Custom hook for managing SEO meta tags dynamically
 * Useful for updating meta tags on specific pages or routes
 *
 * @example
 * ```tsx
 * useSEO({
 *   title: "Custom Page Title - Mentorna",
 *   description: "Custom description for this page",
 *   canonical: "https://mentorna.com/custom-page"
 * });
 * ```
 */
export const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  noindex = false,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'name') {
          element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        } else if (attribute === 'property') {
          element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Update standard meta tags
    if (description) {
      updateMetaTag('meta[name="description"]', 'name', description);
    }

    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', keywords);
    }

    // Update robots meta tag
    if (noindex) {
      updateMetaTag('meta[name="robots"]', 'name', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'name', 'index, follow');
    }

    // Update Open Graph tags
    if (ogTitle) {
      updateMetaTag('meta[property="og:title"]', 'property', ogTitle);
    }

    if (ogDescription) {
      updateMetaTag('meta[property="og:description"]', 'property', ogDescription);
    }

    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', 'property', ogImage);
    }

    if (ogUrl) {
      updateMetaTag('meta[property="og:url"]', 'property', ogUrl);
    }

    // Update Twitter Card tags
    if (twitterTitle) {
      updateMetaTag('meta[name="twitter:title"]', 'name', twitterTitle);
    }

    if (twitterDescription) {
      updateMetaTag('meta[name="twitter:description"]', 'name', twitterDescription);
    }

    if (twitterImage) {
      updateMetaTag('meta[name="twitter:image"]', 'name', twitterImage);
    }

    // Update canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
    noindex,
  ]);
};

/**
 * Default SEO configuration for Mentorna
 * Use this as a base for page-specific SEO
 */
export const defaultSEO: SEOProps = {
  title: 'Mentorna AI Bootcamp - Learn Coding & Build AI Startups in 8 Weeks | €5,000 Prize',
  description: 'Join Mentorna\'s 8-week AI & Entrepreneurship Bootcamp. Learn Python, machine learning, web development, and build your own AI startup. Expert mentors, hands-on projects, and €5,000 prize competition.',
  keywords: 'AI bootcamp, coding bootcamp, entrepreneurship program, Python programming, machine learning, web development, AI education, startup incubator, tech skills, young entrepreneurs, AI innovation, coding for kids, STEM education, artificial intelligence training, Mentorna',
  ogTitle: 'Mentorna AI Bootcamp - Learn Coding & Build AI Startups in 8 Weeks',
  ogDescription: 'Master AI, coding, and entrepreneurship with expert mentors. 8-week intensive program with hands-on projects, €5,000 competition, and lifetime access to materials.',
  ogImage: 'https://d2mp3ttz3u5gci.cloudfront.net/mentorna-og-image.jpg',
  ogUrl: 'https://mentorna.com',
  twitterTitle: 'Mentorna AI Bootcamp - Learn Coding & Build AI Startups',
  twitterDescription: '8-week intensive AI & entrepreneurship program. Learn Python, ML, web dev, and launch your startup with expert mentors.',
  twitterImage: 'https://d2mp3ttz3u5gci.cloudfront.net/mentorna-twitter-card.jpg',
  canonical: 'https://mentorna.com/',
  noindex: false,
};
