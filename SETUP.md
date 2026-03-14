# Dua Companion – Setup Guide

## Prerequisites
- Node.js 18+ and npm
- (Optional) Supabase account for live database

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Environment Variables

Copy the example file:
```bash
cp .env.example .env.local
```

Fill in your values in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://duacompanion.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Note:** The app works without Supabase. It falls back to the 50 built-in duas
> in `data/duas.ts`. Simply leave those env vars empty to use static data.

---

## 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 4. Set Up Supabase (Optional – for live DB)

### a) Create the database schema
1. Go to your Supabase project → SQL Editor
2. Run the contents of `data/schema.sql`

### b) Seed the database with duas
```bash
npm run db:seed
```

---

## 5. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect your GitHub repo to Vercel and it auto-deploys.

**Required environment variables in Vercel dashboard:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` → `https://yourdomain.com`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## 6. Custom Domain

1. In Vercel: Settings → Domains → Add `duacompanion.com`
2. Point your domain's DNS to Vercel's nameservers
3. Update `NEXT_PUBLIC_SITE_URL` to your live domain

---

## Project Structure

```
app/
├── page.tsx              # Homepage
├── duas/[slug]/page.tsx  # Individual dua page
├── category/[slug]/      # Category pages
├── emotion/[slug]/       # Emotion-based pages
├── daily-dua/            # Daily dua page
├── search/               # Search results
├── api/                  # API routes
├── sitemap.ts            # Auto-generated sitemap
└── robots.ts             # Robots.txt

components/
├── layout/               # Navbar, Footer, ThemeProvider
├── home/                 # Hero, EmotionGrid, CategoryGrid, etc.
├── dua/                  # DuaCard, ShareButtons, RelatedDuas
└── ui/                   # Badge, LoadingState

data/
├── duas.ts               # 50 seed duas (expand to 150+)
├── schema.sql            # Supabase schema
└── seed.ts               # Seed script

lib/
├── utils.ts              # Categories, emotions, helpers
├── duas.ts               # Data access layer
└── supabase.ts           # Supabase client
```

---

## Adding More Duas

Add to `data/duas.ts` following the existing schema. Each dua needs:
- `id`, `slug`, `title`
- `arabic_text`, `transliteration`, `translation`
- `source_book`, `hadith_number`, `authenticity_grade`
- `category`, `emotion_tags`, `situation_tags`
- `scholar_verified`, `featured`, `daily_dua_eligible`

---

## SEO Notes

- Every page has unique `<title>`, `<description>`, and canonical URL
- Structured data (schema.org Article) on every dua page
- `sitemap.xml` auto-generated with all pages
- All dua pages are statically generated at build time

---

## Performance

- Static pages generated at build (`generateStaticParams`)
- Arabic font loaded via Google Fonts with `display: swap`
- Images use Next.js `<Image>` with AVIF/WebP formats
- Vercel Edge Network caches API responses
