
export interface WeekActivity {
  type: 'assignment' | 'workshop' | 'seminar' | 'project';
  title: string;
  description: string;
  duration: string;
}

export interface WeekDetails {
  outcome: string;
  activities: WeekActivity[];
  skills: string[];
}

export const weekDetailsData: Record<number, WeekDetails> = {
  1: {
    outcome: "By the end of this week, your teen will think like an entrepreneur, identifying real problems around them and understanding how successful businesses are built from simple ideas.",
    activities: [
      {
        type: 'seminar',
        title: 'Young Entrepreneurs Who Changed the World',
        description: 'Interactive presentation about teen entrepreneurs like Mark Zuckerberg, Evan Spiegel, and more recent success stories.',
        duration: '90 min'
      },
      {
        type: 'workshop',
        title: 'Problem-Spotting Challenge',
        description: 'Hands-on activity where students identify problems in their daily life, school, or community that could become business opportunities.',
        duration: '2 hours'
      },
      {
        type: 'assignment',
        title: 'Market Research Mini-Project',
        description: 'Students research 3 successful startups, understanding what problem they solved and how they started.',
        duration: '3 hours'
      },
      {
        type: 'project',
        title: 'Idea Journal Creation',
        description: 'Create a digital idea journal to document problems and potential solutions throughout the program.',
        duration: '1 hour'
      }
    ],
    skills: [
      'Problem identification and analysis',
      'Market research fundamentals',
      'Entrepreneurial thinking patterns',
      'Opportunity recognition',
      'Basic business model understanding'
    ]
  },
  2: {
    outcome: "Students will master AI-powered brainstorming and turn their ideas into structured, actionable business plans using cutting-edge digital tools.",
    activities: [
      {
        type: 'workshop',
        title: 'AI Brainstorming Bootcamp',
        description: 'Learn to use ChatGPT, Claude, and other AI tools for idea generation, market analysis, and business planning.',
        duration: '2.5 hours'
      },
      {
        type: 'seminar',
        title: 'Digital Blueprint Masterclass',
        description: 'Expert-led session on creating professional business plans using Notion, Figma, and AI-powered templates.',
        duration: '90 min'
      },
      {
        type: 'assignment',
        title: 'Competitive Analysis Report',
        description: 'Use AI tools to analyze 5 competitors and identify market gaps for their chosen business idea.',
        duration: '4 hours'
      },
      {
        type: 'project',
        title: 'Digital Business Plan Creation',
        description: 'Build a comprehensive business plan using AI assistance and digital templates.',
        duration: '5 hours'
      }
    ],
    skills: [
      'AI tool proficiency (ChatGPT, Claude)',
      'Business plan structure and writing',
      'Competitive analysis techniques',
      'Digital collaboration tools',
      'Strategic thinking and planning'
    ]
  },
  3: {
    outcome: "Your teen will have built their first functional app or website without coding, using modern no-code tools and understanding basic product development principles.",
    activities: [
      {
        type: 'workshop',
        title: 'No-Code Development Intensive',
        description: 'Master tools like Bubble, Webflow, or Glide to build functional web apps and mobile applications.',
        duration: '4 hours'
      },
      {
        type: 'seminar',
        title: 'UI/UX Design Principles for Teens',
        description: 'Learn design thinking, user experience basics, and how to create intuitive interfaces.',
        duration: '90 min'
      },
      {
        type: 'project',
        title: 'MVP Development Sprint',
        description: 'Build a minimum viable product (MVP) of their business idea using chosen no-code platform.',
        duration: '8 hours'
      },
      {
        type: 'assignment',
        title: 'Product Documentation',
        description: 'Create user guides and feature documentation for their newly built application.',
        duration: '2 hours'
      }
    ],
    skills: [
      'No-code development platforms',
      'Basic UI/UX design principles',
      'Product development lifecycle',
      'MVP creation and iteration',
      'Digital product testing'
    ]
  },
  4: {
    outcome: "Students will gain confidence in customer interaction, learn to validate their ideas through real feedback, and understand the importance of customer-centric product development.",
    activities: [
      {
        type: 'seminar',
        title: 'Customer Interview Mastery',
        description: 'Learn professional techniques for conducting customer interviews, asking the right questions, and gathering actionable insights.',
        duration: '2 hours'
      },
      {
        type: 'workshop',
        title: 'Survey Design and Analytics',
        description: 'Create professional surveys using tools like Typeform and Google Forms, and analyze customer data.',
        duration: '90 min'
      },
      {
        type: 'assignment',
        title: 'Real Customer Interviews',
        description: 'Conduct 5+ customer interviews with potential users of their product, following professional guidelines.',
        duration: '6 hours'
      },
      {
        type: 'project',
        title: 'Customer Insights Report',
        description: 'Compile interview findings into actionable insights and product improvement recommendations.',
        duration: '3 hours'
      }
    ],
    skills: [
      'Customer interview techniques',
      'Survey design and distribution',
      'Data analysis and interpretation',
      'Customer empathy and understanding',
      'Product-market fit evaluation'
    ]
  },
  5: {
    outcome: "Your teen will elevate their product using AI tools for design, content, and functionality, creating a professional-grade application that stands out in the market.",
    activities: [
      {
        type: 'workshop',
        title: 'AI-Powered Design Enhancement',
        description: 'Use AI tools like Midjourney, DALL-E, and design AI assistants to create stunning visuals and interfaces.',
        duration: '3 hours'
      },
      {
        type: 'seminar',
        title: 'Advanced AI Integration Strategies',
        description: 'Learn how to integrate ChatGPT APIs, AI chatbots, and smart features into their applications.',
        duration: '2 hours'
      },
      {
        type: 'project',
        title: 'Product Enhancement Sprint',
        description: 'Implement AI-powered features and redesign their application with professional-grade elements.',
        duration: '6 hours'
      },
      {
        type: 'assignment',
        title: 'AI Tools Mastery Challenge',
        description: 'Complete challenges using different AI tools to solve specific business and design problems.',
        duration: '4 hours'
      }
    ],
    skills: [
      'AI integration and APIs',
      'Advanced design with AI tools',
      'Content generation using AI',
      'Automation and smart features',
      'Professional product polish'
    ]
  },
  6: {
    outcome: "Students will master the art of product testing, user feedback analysis, and rapid iteration, understanding how successful products evolve through continuous improvement.",
    activities: [
      {
        type: 'workshop',
        title: 'User Testing Laboratory',
        description: 'Set up and conduct professional user testing sessions, learning to observe and document user behavior.',
        duration: '3 hours'
      },
      {
        type: 'seminar',
        title: 'Analytics and Growth Metrics',
        description: 'Understand key performance indicators, user analytics, and how to measure product success.',
        duration: '90 min'
      },
      {
        type: 'assignment',
        title: 'Beta Testing Campaign',
        description: 'Launch a beta version of their product to 20+ real users and collect structured feedback.',
        duration: '5 hours'
      },
      {
        type: 'project',
        title: 'Product Iteration Cycle',
        description: 'Implement user feedback, make improvements, and prepare the final version of their product.',
        duration: '4 hours'
      }
    ],
    skills: [
      'User testing methodologies',
      'Analytics setup and interpretation',
      'Feedback analysis and prioritization',
      'Rapid prototyping and iteration',
      'Product optimization strategies'
    ]
  },
  7: {
    outcome: "Your teen will master the art of storytelling and presentation, gaining the confidence and skills to pitch their ideas like a seasoned entrepreneur to any audience.",
    activities: [
      {
        type: 'seminar',
        title: 'Pitch Deck Mastery Workshop',
        description: 'Learn the anatomy of winning pitch decks by analyzing successful startup presentations and investor pitches.',
        duration: '2 hours'
      },
      {
        type: 'workshop',
        title: 'Storytelling and Public Speaking',
        description: 'Develop compelling narratives, overcome stage fright, and master body language for powerful presentations.',
        duration: '3 hours'
      },
      {
        type: 'assignment',
        title: 'Pitch Deck Creation',
        description: 'Create a professional 10-slide pitch deck with compelling visuals and clear value proposition.',
        duration: '4 hours'
      },
      {
        type: 'project',
        title: 'Mock Investor Presentations',
        description: 'Practice pitching to panels of mentors and peers, receiving feedback on delivery and content.',
        duration: '2 hours'
      }
    ],
    skills: [
      'Professional presentation design',
      'Public speaking and confidence',
      'Storytelling for business',
      'Investor pitch techniques',
      'Handling questions and objections'
    ]
  },
  8: {
    outcome: "Students will experience the thrill of launching their first business, presenting to a real audience, and celebrating the transformation from idea to entrepreneur.",
    activities: [
      {
        type: 'project',
        title: 'Product Launch Preparation',
        description: 'Finalize product, create launch materials, set up social media presence, and prepare marketing strategy.',
        duration: '4 hours'
      },
      {
        type: 'seminar',
        title: 'Demo Day Showcase',
        description: 'Present final products to parents, mentors, and potential customers in a professional demo day event.',
        duration: '3 hours'
      },
      {
        type: 'workshop',
        title: 'Entrepreneurship Next Steps',
        description: 'Learn about continuing the entrepreneurial journey, available resources, and next-level opportunities.',
        duration: '90 min'
      },
      {
        type: 'assignment',
        title: 'Reflection and Goal Setting',
        description: 'Document lessons learned, set future entrepreneurial goals, and create a plan for continued growth.',
        duration: '2 hours'
      }
    ],
    skills: [
      'Product launch strategies',
      'Public demonstration skills',
      'Marketing and promotion',
      'Network building and relationships',
      'Long-term entrepreneurial planning'
    ]
  }
};
