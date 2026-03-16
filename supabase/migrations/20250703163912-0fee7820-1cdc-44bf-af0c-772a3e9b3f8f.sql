
-- First, let's clear any partial data that might exist
DELETE FROM week_activities;
DELETE FROM week_skills; 
DELETE FROM week_outcomes;

-- Now insert the week outcomes with direct week_number matching
INSERT INTO week_outcomes (week_id, outcome_text)
SELECT w.id, v.outcome_text 
FROM weeks w
CROSS JOIN (VALUES
  (1, 'By the end of this week, your teen will think like an entrepreneur, identifying real problems around them and understanding how successful businesses are built from simple ideas.'),
  (2, 'Students will master AI-powered brainstorming and turn their ideas into structured, actionable business plans using cutting-edge digital tools.'),
  (3, 'Your teen will have built their first functional app or website without coding, using modern no-code tools and understanding basic product development principles.'),
  (4, 'Students will gain confidence in customer interaction, learn to validate their ideas through real feedback, and understand the importance of customer-centric product development.'),
  (5, 'Your teen will elevate their product using AI tools for design, content, and functionality, creating a professional-grade application that stands out in the market.'),
  (6, 'Students will master the art of product testing, user feedback analysis, and rapid iteration, understanding how successful products evolve through continuous improvement.'),
  (7, 'Your teen will master the art of storytelling and presentation, gaining the confidence and skills to pitch their ideas like a seasoned entrepreneur to any audience.'),
  (8, 'Students will experience the thrill of launching their first business, presenting to a real audience, and celebrating the transformation from idea to entrepreneur.')
) AS v(week_num, outcome_text)
WHERE w.week_number = v.week_num;

-- Insert all week activities
INSERT INTO week_activities (week_id, activity_type, title, description, duration, order_index)
SELECT w.id, v.activity_type, v.title, v.description, v.duration, v.order_index
FROM weeks w
CROSS JOIN (VALUES
  -- Week 1 activities
  (1, 'seminar', 'Young Entrepreneurs Who Changed the World', 'Interactive presentation about teen entrepreneurs like Mark Zuckerberg, Evan Spiegel, and more recent success stories.', '90 min', 0),
  (1, 'workshop', 'Problem-Spotting Challenge', 'Hands-on activity where students identify problems in their daily life, school, or community that could become business opportunities.', '2 hours', 1),
  (1, 'assignment', 'Market Research Mini-Project', 'Students research 3 successful startups, understanding what problem they solved and how they started.', '3 hours', 2),
  (1, 'project', 'Idea Journal Creation', 'Create a digital idea journal to document problems and potential solutions throughout the program.', '1 hour', 3),
  
  -- Week 2 activities
  (2, 'workshop', 'AI Brainstorming Bootcamp', 'Learn to use ChatGPT, Claude, and other AI tools for idea generation, market analysis, and business planning.', '2.5 hours', 0),
  (2, 'seminar', 'Digital Blueprint Masterclass', 'Expert-led session on creating professional business plans using Notion, Figma, and AI-powered templates.', '90 min', 1),
  (2, 'assignment', 'Competitive Analysis Report', 'Use AI tools to analyze 5 competitors and identify market gaps for their chosen business idea.', '4 hours', 2),
  (2, 'project', 'Digital Business Plan Creation', 'Build a comprehensive business plan using AI assistance and digital templates.', '5 hours', 3),
  
  -- Week 3 activities
  (3, 'workshop', 'No-Code Development Intensive', 'Master tools like Bubble, Webflow, or Glide to build functional web apps and mobile applications.', '4 hours', 0),
  (3, 'seminar', 'UI/UX Design Principles for Teens', 'Learn design thinking, user experience basics, and how to create intuitive interfaces.', '90 min', 1),
  (3, 'project', 'MVP Development Sprint', 'Build a minimum viable product (MVP) of their business idea using chosen no-code platform.', '8 hours', 2),
  (3, 'assignment', 'Product Documentation', 'Create user guides and feature documentation for their newly built application.', '2 hours', 3),
  
  -- Week 4 activities
  (4, 'seminar', 'Customer Interview Mastery', 'Learn professional techniques for conducting customer interviews, asking the right questions, and gathering actionable insights.', '2 hours', 0),
  (4, 'workshop', 'Survey Design and Analytics', 'Create professional surveys using tools like Typeform and Google Forms, and analyze customer data.', '90 min', 1),
  (4, 'assignment', 'Real Customer Interviews', 'Conduct 5+ customer interviews with potential users of their product, following professional guidelines.', '6 hours', 2),
  (4, 'project', 'Customer Insights Report', 'Compile interview findings into actionable insights and product improvement recommendations.', '3 hours', 3),
  
  -- Week 5 activities
  (5, 'workshop', 'AI-Powered Design Enhancement', 'Use AI tools like Midjourney, DALL-E, and design AI assistants to create stunning visuals and interfaces.', '3 hours', 0),
  (5, 'seminar', 'Advanced AI Integration Strategies', 'Learn how to integrate ChatGPT APIs, AI chatbots, and smart features into their applications.', '2 hours', 1),
  (5, 'project', 'Product Enhancement Sprint', 'Implement AI-powered features and redesign their application with professional-grade elements.', '6 hours', 2),
  (5, 'assignment', 'AI Tools Mastery Challenge', 'Complete challenges using different AI tools to solve specific business and design problems.', '4 hours', 3),
  
  -- Week 6 activities
  (6, 'workshop', 'User Testing Laboratory', 'Set up and conduct professional user testing sessions, learning to observe and document user behavior.', '3 hours', 0),
  (6, 'seminar', 'Analytics and Growth Metrics', 'Understand key performance indicators, user analytics, and how to measure product success.', '90 min', 1),
  (6, 'assignment', 'Beta Testing Campaign', 'Launch a beta version of their product to 20+ real users and collect structured feedback.', '5 hours', 2),
  (6, 'project', 'Product Iteration Cycle', 'Implement user feedback, make improvements, and prepare the final version of their product.', '4 hours', 3),
  
  -- Week 7 activities
  (7, 'seminar', 'Pitch Deck Mastery Workshop', 'Learn the anatomy of winning pitch decks by analyzing successful startup presentations and investor pitches.', '2 hours', 0),
  (7, 'workshop', 'Storytelling and Public Speaking', 'Develop compelling narratives, overcome stage fright, and master body language for powerful presentations.', '3 hours', 1),
  (7, 'assignment', 'Pitch Deck Creation', 'Create a professional 10-slide pitch deck with compelling visuals and clear value proposition.', '4 hours', 2),
  (7, 'project', 'Mock Investor Presentations', 'Practice pitching to panels of mentors and peers, receiving feedback on delivery and content.', '2 hours', 3),
  
  -- Week 8 activities
  (8, 'project', 'Product Launch Preparation', 'Finalize product, create launch materials, set up social media presence, and prepare marketing strategy.', '4 hours', 0),
  (8, 'seminar', 'Demo Day Showcase', 'Present final products to parents, mentors, and potential customers in a professional demo day event.', '3 hours', 1),
  (8, 'workshop', 'Entrepreneurship Next Steps', 'Learn about continuing the entrepreneurial journey, available resources, and next-level opportunities.', '90 min', 2),
  (8, 'assignment', 'Reflection and Goal Setting', 'Document lessons learned, set future entrepreneurial goals, and create a plan for continued growth.', '2 hours', 3)
) AS v(week_num, activity_type, title, description, duration, order_index)
WHERE w.week_number = v.week_num;

-- Insert all week skills
INSERT INTO week_skills (week_id, skill_name, order_index)
SELECT w.id, v.skill_name, v.order_index
FROM weeks w
CROSS JOIN (VALUES
  -- Week 1 skills
  (1, 'Problem identification and analysis', 0),
  (1, 'Market research fundamentals', 1),
  (1, 'Entrepreneurial thinking patterns', 2),
  (1, 'Opportunity recognition', 3),
  (1, 'Basic business model understanding', 4),
  
  -- Week 2 skills
  (2, 'AI tool proficiency (ChatGPT, Claude)', 0),
  (2, 'Business plan structure and writing', 1),
  (2, 'Competitive analysis techniques', 2),
  (2, 'Digital collaboration tools', 3),
  (2, 'Strategic thinking and planning', 4),
  
  -- Week 3 skills
  (3, 'No-code development platforms', 0),
  (3, 'Basic UI/UX design principles', 1),
  (3, 'Product development lifecycle', 2),
  (3, 'MVP creation and iteration', 3),
  (3, 'Digital product testing', 4),
  
  -- Week 4 skills
  (4, 'Customer interview techniques', 0),
  (4, 'Survey design and distribution', 1),
  (4, 'Data analysis and interpretation', 2),
  (4, 'Customer empathy and understanding', 3),
  (4, 'Product-market fit evaluation', 4),
  
  -- Week 5 skills
  (5, 'AI integration and APIs', 0),
  (5, 'Advanced design with AI tools', 1),
  (5, 'Content generation using AI', 2),
  (5, 'Automation and smart features', 3),
  (5, 'Professional product polish', 4),
  
  -- Week 6 skills
  (6, 'User testing methodologies', 0),
  (6, 'Analytics setup and interpretation', 1),
  (6, 'Feedback analysis and prioritization', 2),
  (6, 'Rapid prototyping and iteration', 3),
  (6, 'Product optimization strategies', 4),
  
  -- Week 7 skills
  (7, 'Professional presentation design', 0),
  (7, 'Public speaking and confidence', 1),
  (7, 'Storytelling for business', 2),
  (7, 'Investor pitch techniques', 3),
  (7, 'Handling questions and objections', 4),
  
  -- Week 8 skills
  (8, 'Product launch strategies', 0),
  (8, 'Public demonstration skills', 1),
  (8, 'Marketing and promotion', 2),
  (8, 'Network building and relationships', 3),
  (8, 'Long-term entrepreneurial planning', 4)
) AS v(week_num, skill_name, order_index)
WHERE w.week_number = v.week_num;
