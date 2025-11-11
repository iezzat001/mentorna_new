# Mentorna AI Bootcamp

## Project Overview

Mentorna is a premium AI education platform offering an 8-week intensive online bootcamp for children and teenagers (ages 8-18) to learn AI, coding, and entrepreneurship skills.

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe development
- **React 18** - UI component framework
- **Tailwind CSS** - Utility-first styling framework
- **shadcn-ui** - Component library
- **Supabase** - Backend infrastructure (PostgreSQL, Auth, Edge Functions)
- **React Query** - Server state management
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd mentorna_new
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
mentorna_new/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom React hooks
│   ├── integrations/  # External service integrations
│   ├── lib/           # Utility libraries
│   └── types/         # TypeScript type definitions
├── supabase/
│   ├── functions/     # Edge functions
│   └── migrations/    # Database migrations
├── public/            # Static assets
└── Documentation/     # Project documentation
```

## Key Features

- Responsive landing pages (desktop and mobile TikTok-style)
- 8-week curriculum display
- Admin dashboard with CMS capabilities
- Lead capture and management
- Email campaign management
- Analytics and visitor tracking
- Google Analytics 4 and Meta Pixel integration

## Documentation

Comprehensive documentation is available in the root directory:

- `PROJECT_BRIEF.md` - Business strategy and overview
- `DESIGN_SYSTEM.md` - Neubrutalism design guidelines
- `MOBILE_DESIGN_SYSTEM.md` - Mobile-specific patterns
- `GA4_VERIFICATION_GUIDE.md` - Analytics setup
- `FOUNDERS_SECTION_TECHNICAL_GUIDE.md` - Technical implementation

## Deployment

This project can be deployed to any static hosting service that supports Vite applications:

- Vercel
- Netlify
- Cloudflare Pages
- AWS Amplify
- Firebase Hosting

Build the project first:
```sh
npm run build
```

The output will be in the `dist/` directory.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright © 2025 Mentorna. All rights reserved.

## Support

For questions or support, contact: info@mentorna.com
