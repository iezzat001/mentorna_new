# SEO Guide for Mentorna

This document outlines all SEO optimizations implemented for the Mentorna platform and how to maintain and enhance them.

## Table of Contents

1. [Current SEO Implementation](#current-seo-implementation)
2. [Meta Tags](#meta-tags)
3. [Structured Data](#structured-data)
4. [Sitemap & Robots.txt](#sitemap--robotstxt)
5. [Dynamic SEO Management](#dynamic-seo-management)
6. [Best Practices](#best-practices)
7. [Testing & Validation](#testing--validation)
8. [Future Enhancements](#future-enhancements)

---

## Current SEO Implementation

### Files Modified/Created

- ✅ `index.html` - Enhanced with comprehensive meta tags and structured data
- ✅ `public/site.webmanifest` - Updated to Mentorna branding (removed iLab references)
- ✅ `public/robots.txt` - Configured for search engine crawling with sitemap reference
- ✅ `public/sitemap.xml` - Created for search engine discovery
- ✅ `README.md` - Removed Lovable-specific references
- ✅ `src/hooks/useSEO.ts` - Custom hook for dynamic SEO management
- ✅ `src/utils/structuredData.ts` - Utilities for generating Schema.org markup

---

## Meta Tags

### Basic Meta Tags (index.html)

```html
<!-- Essential Meta Tags -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="canonical" href="https://mentorna.com/" />

<!-- SEO Meta Tags -->
<meta name="description" content="Join Mentorna's 8-week AI & Entrepreneurship Bootcamp..." />
<meta name="keywords" content="AI bootcamp, coding bootcamp, entrepreneurship program..." />
<meta name="author" content="Mentorna - AI Education & Innovation Hub" />
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />
<meta name="google" content="notranslate" />
```

### Open Graph Tags

```html
<meta property="og:title" content="Mentorna AI Bootcamp - Learn Coding & Build AI Startups in 8 Weeks" />
<meta property="og:description" content="Master AI, coding, and entrepreneurship..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://mentorna.com" />
<meta property="og:image" content="https://d2mp3ttz3u5gci.cloudfront.net/mentorna-og-image.jpg" />
<meta property="og:site_name" content="Mentorna AI Bootcamp" />
<meta property="og:locale" content="en_US" />
```

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Mentorna AI Bootcamp - Learn Coding & Build AI Startups" />
<meta name="twitter:description" content="8-week intensive AI & entrepreneurship program..." />
<meta name="twitter:image" content="https://d2mp3ttz3u5gci.cloudfront.net/mentorna-twitter-card.jpg" />
<meta name="twitter:site" content="@MentornaBootcamp" />
```

---

## Structured Data

### Implemented Schema Types

1. **EducationalOrganization** - Brand and organization information
2. **Course** - Detailed course/bootcamp information
3. **FAQPage** - Frequently asked questions for rich snippets
4. **WebSite** - Site-level information with search action

### Example: Course Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI & Entrepreneurship Bootcamp",
  "description": "8-week intensive online bootcamp...",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Mentorna",
    "url": "https://mentorna.com"
  },
  "courseMode": "online",
  "educationalLevel": "Beginner to Intermediate",
  "timeRequired": "P8W",
  "typicalAgeRange": "8-18"
}
```

### FAQ Schema

The FAQ schema includes 6 common questions:
- What is Mentorna AI Bootcamp?
- How long is the program?
- What is the age range for students?
- How much does the bootcamp cost?
- Is the program online or in-person?
- What will students learn?

This enables rich snippets in Google search results.

---

## Sitemap & Robots.txt

### Sitemap (public/sitemap.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mentorna.com/</loc>
    <lastmod>2025-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Update Instructions:**
- When adding new public pages, add them to the sitemap
- Update the `lastmod` date when making significant content changes
- Submit the sitemap to Google Search Console

### Robots.txt (public/robots.txt)

```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://mentorna.com/sitemap.xml
```

---

## Dynamic SEO Management

### Using the useSEO Hook

For page-specific SEO customization, use the `useSEO` hook:

```tsx
import { useSEO } from '@/hooks/useSEO';

const MyPage = () => {
  useSEO({
    title: 'Custom Page Title - Mentorna',
    description: 'Custom description for this specific page',
    canonical: 'https://mentorna.com/custom-page',
    ogTitle: 'Custom OG Title',
    ogDescription: 'Custom OG description',
    ogImage: 'https://example.com/custom-image.jpg',
  });

  return <div>Page content</div>;
};
```

### Available Options

```typescript
interface SEOProps {
  title?: string;                // Page title
  description?: string;          // Meta description
  keywords?: string;             // Meta keywords
  ogTitle?: string;              // Open Graph title
  ogDescription?: string;        // Open Graph description
  ogImage?: string;              // Open Graph image URL
  ogUrl?: string;                // Open Graph URL
  twitterTitle?: string;         // Twitter card title
  twitterDescription?: string;   // Twitter card description
  twitterImage?: string;         // Twitter card image
  canonical?: string;            // Canonical URL
  noindex?: boolean;             // Prevent indexing (default: false)
}
```

### Generating Structured Data Dynamically

Use the structured data utilities for programmatic schema generation:

```tsx
import { generateCourseSchema, injectStructuredData } from '@/utils/structuredData';

// Generate course schema
const courseSchema = generateCourseSchema({
  name: 'AI & Entrepreneurship Bootcamp',
  description: '8-week intensive program...',
  provider: 'Mentorna',
  providerUrl: 'https://mentorna.com',
  price: '329',
  priceCurrency: 'USD',
  duration: 'P8W',
  ageRange: '8-18',
});

// Inject into page
injectStructuredData(courseSchema, 'course-schema');
```

---

## Best Practices

### Title Tags

- Keep under 60 characters
- Include primary keyword near the beginning
- Include brand name (Mentorna)
- Make it compelling and click-worthy

**Current:** "Mentorna AI Bootcamp - Learn Coding & Build AI Startups in 8 Weeks | €5,000 Prize"

### Meta Descriptions

- Keep between 150-160 characters
- Include primary and secondary keywords naturally
- Include a call-to-action
- Make it accurate and compelling

**Current:** "Join Mentorna's 8-week AI & Entrepreneurship Bootcamp. Learn Python, machine learning, web development, and build your own AI startup. Expert mentors, hands-on projects, and €5,000 prize competition. Transform your future with cutting-edge AI skills."

### Image Optimization

**Required Images for SEO:**
- `mentorna-og-image.jpg` (1200x630px) - Open Graph image
- `mentorna-twitter-card.jpg` (1200x600px) - Twitter card image
- `mentorna-logo.png` - Brand logo for structured data

**Image Requirements:**
- Use descriptive file names
- Add alt text to all images
- Optimize file sizes (compress without quality loss)
- Use modern formats (WebP with fallbacks)

### URL Structure

- Keep URLs short and descriptive
- Use hyphens to separate words
- Include relevant keywords
- Avoid special characters and parameters when possible

---

## Testing & Validation

### Tools for Testing SEO

1. **Google Search Console**
   - Submit sitemap
   - Monitor indexing status
   - Check for crawl errors
   - View search performance

2. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test structured data implementation
   - Verify Course and FAQ schemas

3. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Validate JSON-LD markup
   - Check for schema errors

4. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test Open Graph tags
   - Clear Facebook cache

5. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter card implementation

6. **Mobile-Friendly Test**
   - URL: https://search.google.com/test/mobile-friendly
   - Ensure mobile optimization

### Validation Checklist

- [ ] All meta tags are present and accurate
- [ ] No references to "iLab" or "Lovable" in metadata
- [ ] Structured data validates without errors
- [ ] Sitemap is accessible at /sitemap.xml
- [ ] Robots.txt is accessible and correct
- [ ] Canonical URLs are set correctly
- [ ] Open Graph images load properly
- [ ] Twitter cards display correctly
- [ ] Page loads under 3 seconds
- [ ] Mobile experience is optimized

---

## Future Enhancements

### Recommended Additions

1. **Blog/Content Section**
   - Add blog posts for SEO content marketing
   - Implement Article schema for blog posts
   - Create pillar content around AI education

2. **Multilingual Support**
   - Add hreflang tags for international targeting
   - Translate content for key markets
   - Implement language-specific sitemaps

3. **Video SEO**
   - Add VideoObject schema for promotional videos
   - Upload videos to YouTube and embed
   - Create video transcripts for accessibility

4. **Local SEO** (if applicable)
   - Add LocalBusiness schema if physical presence
   - Claim Google Business Profile
   - Implement NAP (Name, Address, Phone) consistency

5. **Performance Optimization**
   - Implement lazy loading for images
   - Enable browser caching
   - Minimize CSS/JS bundles
   - Use CDN for static assets

6. **Content Expansion**
   - Add student success stories page
   - Create curriculum detail pages
   - Build resource library
   - Implement testimonials section

7. **Link Building**
   - Create shareable content
   - Partner with educational platforms
   - Guest posting on relevant blogs
   - Build relationships with education influencers

8. **Analytics & Tracking**
   - Set up Google Search Console
   - Monitor Core Web Vitals
   - Track keyword rankings
   - Analyze user behavior

---

## Monitoring & Maintenance

### Monthly SEO Tasks

- [ ] Review Google Search Console for errors
- [ ] Check for broken links
- [ ] Update sitemap if new pages added
- [ ] Monitor page load speed
- [ ] Review keyword rankings
- [ ] Analyze competitor SEO strategies

### Quarterly SEO Tasks

- [ ] Audit all meta tags and descriptions
- [ ] Update structured data if offerings change
- [ ] Refresh content based on performance
- [ ] Review and update keywords
- [ ] Analyze backlink profile
- [ ] Test all SEO tools and validators

---

## Resources

### Documentation
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Screaming Frog SEO Spider](https://www.screamingfrogseoseo.co.uk/)
- [Ahrefs](https://ahrefs.com/)
- [SEMrush](https://www.semrush.com/)

---

## Support

For questions about SEO implementation or to report issues:

**Email:** info@mentorna.com

**Last Updated:** November 11, 2025
