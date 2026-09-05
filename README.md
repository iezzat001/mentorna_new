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

Documentation lives in `docs/`:

**Guides** (`docs/guides/`)

- `PROJECT_BRIEF.md` - Business strategy and overview
- `DESIGN_SYSTEM.md` - Neubrutalism design guidelines
- `MOBILE_DESIGN_SYSTEM.md` - Mobile-specific patterns
- `SEO_GUIDE.md` - SEO conventions
- `GA4_VERIFICATION_GUIDE.md` - Analytics setup
- `FOUNDERS_SECTION_TECHNICAL_GUIDE.md` - Technical implementation

**Offers** (`docs/`) - one markdown spec per private client offer page

**Lead magnets** (`docs/lead_magnet/`) - specs and the downloadable canvases
served from CloudFront for the "ابني Startup في 30 يوم" series

## Community Webinars

The `/community` page hosts recordings of the weekly community webinars with the
date, topic, and a short brief, plus per-webinar watch analytics in the admin
dashboard (**Webinar Analytics** tab).

### Adding a new webinar

1. **Upload the recording to S3/CloudFront.** Use the helper script:
   ```sh
   export WEBINAR_S3_BUCKET=your-bucket-name
   scripts/upload-webinar-to-s3.sh ./recording.mp4 2026-08-21-community-webinar.mp4 ./poster.jpg
   ```
   This uploads to `webinars/<name>` and the file becomes available at
   `https://d2mp3ttz3u5gci.cloudfront.net/webinars/<name>`.
2. **Add a poster thumbnail** to `public/webinars/<name>.jpg` (a 1280×720 frame
   works well). Posters are committed to the app rather than the CDN, so they
   render without a separate upload.
3. **Register it** by adding an entry to `webinars` in `src/data/webinars.ts`
   (`id`, `title`, `description`, `date`, `durationSeconds`, `videoFile`,
   `posterFile`). Keep `id` stable so analytics keep matching.

To point the app at a different media host during local development, set
`VITE_WEBINAR_MEDIA_BASE` in `.env.local`.

### Watch analytics

Playback progress is recorded to the `webinar_watch_events` Supabase table
(views, watch time, retention, completion). Apply the migration in
`supabase/migrations/20260904000000_create_webinar_watch_events.sql` to the
Supabase project before analytics go live. Until then, the player still works
and events are buffered client-side and retried automatically.

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
