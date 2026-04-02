# SafetyDocs Pro

AI-powered OSHA compliance document generator for small residential construction subcontractors. Generate professional toolbox talks with correct regulation citations in seconds.

## Features

- Toolbox talk generation for 17 residential construction trades
- AI-powered content with OSHA regulation citations (29 CFR 1926)
- Professional PDF download with branding, signature lines, and attendee fields
- Mobile-responsive (contractors use phones on job sites)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your Anthropic API key:

```bash
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Anthropic Claude API for document generation
- jsPDF for PDF generation
- Vercel for hosting (planned)

## Project Structure

```
src/
  app/
    page.tsx                          # Landing page
    layout.tsx                        # Root layout with metadata
    globals.css                       # Global styles + Tailwind
    generate/
      page.tsx                        # Document generation form + preview
    api/
      generate-toolbox-talk/
        route.ts                      # AI generation API endpoint
  lib/
    types.ts                          # Shared TypeScript types
    trades.ts                         # Trade list constants
    generate-pdf.ts                   # PDF generation utility
```
