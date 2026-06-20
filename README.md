# S. Nithiesh — Portfolio (Next.js)

Production portfolio: glassmorphic aurora design + a real backend, including an
**"Ask my portfolio"** AI assistant (RAG over résumé & projects).

## Stack
Next.js (App Router) · React 19 · TypeScript · CSS variables (no Tailwind needed — the
design system lives in `app/globals.css`) · Edge API routes · Anthropic (AI) · Resend (email).

## Quick start
```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev                  # http://localhost:3000
```

## Environment variables
| Var | Purpose |
|-----|---------|
| `ANTHROPIC_API_KEY` | Powers the "Ask my portfolio" widget (`/api/ask`) |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | Contact form email (`/api/contact`) |

The site runs fine without keys — the AI widget and form simply return a "not configured" message.

## Where to edit
- **Your content** → `content/projects.ts` (one typed object) and `config/site.ts`.
- **Design tokens / themes** → top of `app/globals.css` (`[data-theme=...]`).
- **AI behaviour** → `app/api/ask/route.ts` (system prompt + rate limit).
- Drop `resume.pdf` and `preview.png` (1200×630 OG image) into `public/`.

## How the AI widget works
The whole portfolio is a few KB of text, so `lib/portfolioContext.ts` puts all of it
into the model's context — the simplest *correct* design at this size. When you add long
MDX case studies, switch to embeddings + a vector store (Pinecone/Chroma). The route is
rate-limited (8 q/min/IP) and capped at 400 tokens to keep costs predictable.

## Deploy (Vercel)
1. Push to GitHub.
2. Import the repo in Vercel; add the env vars.
3. Every PR gets a preview URL; merge to `main` → production.
4. Add your custom domain (HTTPS is automatic).

## Features
- **Glassmorphic aurora UI** with 4 themes + a ⌘K command palette
- **Ask my portfolio** — AI assistant (`/api/ask`, RAG over résumé/projects)
- **MDX case studies** at `/case/[slug]` (pre-rendered, SEO-friendly) — write `.mdx` files in `content/case-studies/`
- **Guestbook** (`/api/guestbook`) + **view counter** (`/api/views`) backed by Upstash Redis (in-memory fallback)
- **Dynamic OG image** (`app/opengraph-image.tsx`) for social previews
- **Print → résumé** stylesheet (Ctrl-P, or the palette command, makes a clean one-page PDF)
- **CI**: typecheck + build on every PR, Lighthouse with accessibility (axe) + SEO assertions

## Roadmap (done / future)
- [x] MDX case studies for the flagship projects
- [x] Guestbook + view counter (Upstash, with in-memory fallback)
- [x] Dynamic OG image, print-to-résumé, ⌘K palette
- [x] Lighthouse CI + accessibility (axe) checks
- [ ] Upgrade AI to vector RAG — *only when content grows; context-stuffing is correct at current size*
- [ ] Add a real `preview.png` fallback + verified Resend sending domain
