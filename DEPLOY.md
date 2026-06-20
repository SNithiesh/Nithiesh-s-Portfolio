# Deploying this portfolio

You have two deliverables:
- `portfolio.html` — single static file (no build, no backend).
- this Next.js app — the full site (AI assistant, contact form, case studies, guestbook).

## Which host?
- **Next.js app → Vercel** (recommended). Vercel is built by the Next.js team; App Router,
  edge functions, dynamic OG image, and env vars all work zero-config. This app uses the
  edge runtime in 4 routes, which Vercel supports natively.
- **portfolio.html → Netlify Drop** (or Vercel). Fastest possible: drag-and-drop, 30 seconds.

---

## Option A — Next.js app to Vercel (best)

### 1. Push to GitHub
```bash
cd nithiesh-portfolio
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
# create an empty repo at https://github.com/new  (e.g. name it "portfolio"), then:
git remote add origin https://github.com/SNithiesh/portfolio.git
git push -u origin main
```
(.gitignore already excludes node_modules, .next, and .env files — your keys stay private.)

### 2. Deploy on Vercel
1. Go to https://vercel.com and sign in **with GitHub**.
2. **Add New → Project**, pick your `portfolio` repo, click **Import**.
3. Framework = Next.js (auto-detected). Leave build settings default.
4. Add Environment Variables (see table below) — optional; the site runs without them.
5. **Deploy**. You get a live `*.vercel.app` URL in ~1 minute.
6. (Optional) Add a custom domain under Project → Settings → Domains.

### Environment variables (all optional)
| Variable | Enables | Where to get it |
|---|---|---|
| `OPENROUTER_API_KEY` | "Ask my portfolio" AI assistant (free models) | openrouter.ai/keys |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Persistent guestbook + view counts | upstash.com (free tier) |

Optional `OPENROUTER_MODEL` pins a specific free model (default `openrouter/free` auto-selects one).

The contact form posts to Formspree (already wired — no key needed).

Without these: the AI widget is disabled and the guestbook/views
fall back to in-memory (reset on redeploy). Everything else works fully.

After the first deploy, every `git push` auto-deploys.

---

## Option B — portfolio.html to Netlify (fastest)
1. Rename `portfolio.html` to `index.html`.
2. Go to https://app.netlify.com/drop and drag the file in.
3. Done — instant live URL. Add a custom domain in Site settings if you want.

(The single HTML has no backend, so the AI assistant and email contact aren't active —
the contact form posts to your Formspree endpoint, which already works.)
