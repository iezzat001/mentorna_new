/**
 * Utility functions for generating Schema.org structured data (JSON-LD)
 * Use these to create rich snippets for search engines
 */

export interface OrganizationData {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  logo: string;
  email: string;
  socialMedia?: string[];
}

export interface CourseData {
  name: string;
  description: string;
  provider: string;
  providerUrl: string;
  price: string;
  priceCurrency: string;
  duration: string;
  ageRange?: string;
  teaches?: string[];
  instructors?: Array<{ name: string; description: string }>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate Organization structured data
 */
export const generateOrganizationSchema = (data: OrganizationData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: data.name,
    ...(data.alternateName && { alternateName: data.alternateName }),
    description: data.description,
    url: data.url,
    logo: data.logo,
    ...(data.socialMedia && { sameAs: data.socialMedia }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: data.email,
      availableLanguage: ['English'],
    },
  };
};

/**
 * Generate Course structured data
 */
export const generateCourseSchema = (data: CourseData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: data.provider,
      url: data.providerUrl,
    },
    courseMode: 'online',
    timeRequired: data.duration,
    ...(data.ageRange && { typicalAgeRange: data.ageRange }),
    ...(data.teaches && { teaches: data.teaches }),
    ...(data.instructors && {
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: data.instructors.map((instructor) => ({
          '@type': 'Person',
          name: instructor.name,
          description: instructor.description,
        })),
      },
    }),
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.priceCurrency,
      availability: 'https://schema.org/InStock',
    },
  };
};

/**
 * Generate FAQ structured data
 */
export const generateFAQSchema = (items: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

/**
 * Generate BreadcrumbList structured data
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate WebSite structured data with search action
 */
export const generateWebSiteSchema = (siteUrl: string, siteName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generate Product structured data (useful for course offerings)
 */
export const generateProductSchema = (data: {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency: string;
  availability: string;
  brand: string;
  rating?: { value: number; count: number };
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.image,
    brand: {
      '@type': 'Brand',
      name: data.brand,
    },
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.priceCurrency,
      availability: `https://schema.org/${data.availability}`,
    },
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating.value,
        reviewCount: data.rating.count,
      },
    }),
  };
};

/**
 * Inject structured data into the page
 * @param schema The schema object to inject
 * @param id Optional ID for the script tag (useful for removing/updating)
 */
export const injectStructuredData = (
  schema: Record<string, any>,
  id?: string
) => {
  // Remove existing script with the same ID if it exists
  if (id) {
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) {
    script.id = id;
  }
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Remove structured data from the page
 * @param id The ID of the script tag to remove
 */
export const removeStructuredData = (id: string) => {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
};
