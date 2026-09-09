import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
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
  ogType,
  ogUrl,
  twitterCard,
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

    if (ogType) {
      updateMetaTag('meta[property="og:type"]', 'property', ogType);
    }

    if (ogUrl) {
      updateMetaTag('meta[property="og:url"]', 'property', ogUrl);
    }

    // Update Twitter Card tags
    if (twitterCard) {
      updateMetaTag('meta[name="twitter:card"]', 'name', twitterCard);
    }

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
    ogType,
    ogUrl,
    twitterCard,
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
  title: 'Mentorna® · 0→1 Cohort & Private Mentorship',
  description:
    'Build a business with AI teammates in four weeks, or work 1:1 mentorship with Ahmed Ezzat.',
  keywords:
    '0 to 1 cohort, AI entrepreneurship, private mentorship, build with AI, startup cohort, Ahmed Ezzat, Mentorna, domain experts, founder mentorship',
  ogTitle: 'Mentorna® · 0→1 Cohort & Private Mentorship',
  ogDescription:
    'Build a business with AI teammates in four weeks, or work 1:1 mentorship with Ahmed Ezzat.',
  ogImage: 'https://d2mp3ttz3u5gci.cloudfront.net/mentorna-og-image.jpg',
  ogUrl: 'https://mentorna.com',
  twitterTitle: 'Mentorna® · 0→1 Cohort & Private Mentorship',
  twitterDescription:
    'Build a business with AI teammates in four weeks, or work 1:1 mentorship with Ahmed Ezzat.',
  twitterImage: 'https://d2mp3ttz3u5gci.cloudfront.net/mentorna-twitter-card.jpg',
  canonical: 'https://mentorna.com/',
  noindex: false,
};
