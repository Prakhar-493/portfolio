# Portfolio Website

Single-page portfolio site showcasing projects, skills, and contact information. Built with the Next.js App Router and modern styling utilities for fast, accessible presentation.

## Features

- Hero banner with animated typewriter introduction
- Bento-style skills grid and impact metrics
- Project highlights linking to live demos or repositories
- Contact form backed by a serverless route for message delivery
- Responsive navigation and footer optimized for desktop and mobile

## Tech Stack

- Next.js 14 with the App Router
- TypeScript for type-safe components
- Tailwind CSS for utility-first styling
- Vercel serverless functions for contact form handling

## Getting Started

Install dependencies and start the development server.

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to explore the site locally. Hot reload is enabled by default.

## Environment Variables

Create .env.local based on .env.example (if present) and set the following values before running in production:

- CONTACT_FORM_ENDPOINT: Destination or API key required by the contact route
- Any third-party API keys referenced inside app/api/contact/route.ts

Restart the dev server whenever environment values change.

## Deployment

The site targets Vercel deployment. Push to the main branch to trigger the default deployment pipeline or configure a custom CI/CD workflow. Ensure environment variables are configured in the hosting provider before promoting to production.

## Contributing

1. Fork the repository and create a feature branch.
2. Run npm run lint to enforce coding standards.
3. Submit a pull request with a concise summary of changes and screenshots where relevant.
