# JR Real Estate Varanasi &bull; Web Platform &amp; Lead CRM

Official web platform, property inventory management, and lead CRM for **JR Real Estate Varanasi**, led by **Director Mr. Umesh Yadav**.

- **Business:** JR Real Estate Varanasi
- **Director:** Mr. Umesh Yadav
- **Helpline:** +91 89483 01111
- **Head Office:** S9/90A, Pandeypur Chauraha, Varanasi, Uttar Pradesh, 221002
- **Website:** [https://jrrealestate.in](https://jrrealestate.in)
- **Brand Tagline:** &ldquo;Your Dream Home, Our Responsibility&rdquo;

---

## 1. Required Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router) with TypeScript & React 18 |
| **Styling & Design System** | Tailwind CSS (Charcoal `#0B0D0D`, Metallic Gold `#D5A24A`, Warm Ivory `#F7F1E6`, Serif Headings) |
| **Database** | Supabase-hosted PostgreSQL |
| **ORM & Migrations** | Prisma ORM (`@prisma/client`, `prisma`) |
| **Authentication** | Supabase Auth (with PostgreSQL RBAC mapping) |
| **Image & Asset Storage** | Supabase Storage (`jr-media` bucket) |
| **Hosting & Deployment** | Vercel (Edge-ready, SSR & Server Actions) |

---

## 2. Environment Variables Setup

Copy `.env.example` to `.env.local` and populate your Supabase project credentials:

```bash
cp .env.example .env.local
```

### Required Configuration in `.env.local`

```env
# Public Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase PostgreSQL Connection Strings
# Transaction pooler URL (port 6543)
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection URL for Prisma migrations (port 5432)
DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Supabase Auth & Storage (Client Keys)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# SERVER-SIDE ONLY: Service Role Key (Never expose to client code)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Storage Bucket Name for Property & Project Media
SUPABASE_STORAGE_BUCKET="jr-media"
```

---

## 3. Local Installation & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

3. **Push Schema to Supabase Database (or Run Migrations):**
   ```bash
   npm run prisma:db-push
   # or
   npx prisma migrate dev --name init
   ```

4. **Seed Prime Varanasi Localities & Admin Profile:**
   ```bash
   npm run prisma:seed
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Application Architecture & Key Modules

### A. Public Website (`app/(public)/...`)
- **Homepage (`/`):** Hero with headline *“Find Your Dream Property in Varanasi”*, quick categories, featured listings, turnkey construction showcase, builder projects spotlight, why choose us, FAQs, lead capture form, and circular logo branding.
- **Buy Property (`/buy`):** Multi-faceted search filters (Category, Locality, Min/Max Price, Area, BHK, Possession status), active filter chips, sort order, and pagination.
- **Rent / Lease (`/rent`):** Rental listings and commercial leases in Varanasi.
- **Sell Property (`/sell`):** Submission form for property owners to list plots/flats directly into CRM.
- **New Projects (`/projects` & `/projects/[slug]`):** Masterplanned townships and builder developments with RERA status disclosures.
- **Construction (`/construction`):** Turnkey home building with interactive indicative cost estimator (Standard ₹1,550/sq.ft, Premium ₹1,950/sq.ft, Luxury ₹2,500/sq.ft) and free plot inspection booking.
- **Builder Services (`/services`):** VDA map sanctioning, 30-year Barah Sala title search, registry coordination, and Tehsil Dakhil Kharij mutation assistance.
- **About Us (`/about`):** Director Mr. Umesh Yadav message, company vision, and Pandeypur office credentials.
- **Portfolio (`/portfolio`):** Visual gallery of active and completed construction sites in Varanasi.
- **Guides & Blog (`/blog` & `/blog/[slug]`):** Varanasi real estate circle rates, stamp duty, and construction guides.
- **Contact Us (`/contact`):** Office map, direct call (+91 89483 01111), and WhatsApp click-to-chat.
- **Legal Compliance (`/privacy`, `/terms`, `/disclaimer`):** Consumer protection disclosures and statutory RERA notices.

### B. Protected Admin Panel & CRM (`/admin/...`)
- **Dashboard (`/admin`):** Live KPIs (active properties, uncontacted leads, scheduled visits, open construction leads), recent activity stream.
- **Leads CRM (`/admin/leads`):** Full pipeline management, status transitions (`NEW` &rarr; `CONTACTED` &rarr; `QUALIFIED` &rarr; `VISIT_SCHEDULED` &rarr; `VISIT_COMPLETED` &rarr; `NEGOTIATION` &rarr; `CONVERTED` &rarr; `LOST_ON_HOLD`), call logs, and **duplicate phone detection with safe merge**.
- **Properties Management (`/admin/properties`):** Draft creation, pricing edits, feature toggle, duplication, and archive workflow.
- **Site Visits (`/admin/site-visits`):** Scheduled physical property inspections and outcome tracking.
- **Construction Leads (`/admin/construction`):** Turnkey construction requests with plot size, floors, and budget details.
- **Builder Projects (`/admin/projects`):** Project updates, floor plans, and RERA fields.
- **Taxonomies (`/admin/taxonomies`):** Varanasi localities, property categories, and colony amenities.
- **CMS & Content (`/admin/content`):** FAQs, Blog articles, and verified testimonial management.
- **Media Library (`/admin/media`):** Uploads to Supabase Storage with local dev fallback.
- **SEO & Indexing (`/admin/seo`):** Sitemap status, robots.txt, and OpenGraph controls.
- **Team & Roles (`/admin/team`):** RBAC permissions (`SUPER_ADMIN`, `SALES_MANAGER`, `PROPERTY_MANAGER`, `CONSTRUCTION_MANAGER`, `CONTENT_MANAGER`, `VIEWER`).
- **Settings & Audit Logs (`/admin/settings`):** Business configuration, indicative construction rates, immutable audit logs, and database backup guides.

---

## 5. Security & Access Control Guidelines

1. **Server-Side Authorization:** Role permissions are verified in server actions and routes (`lib/auth.ts`), never solely in client UI markup.
2. **Service Role Key Isolation:** `SUPABASE_SERVICE_ROLE_KEY` is loaded strictly on the server (`lib/supabase/admin.ts`). It is never bundled into browser code.
3. **Clean URLs:** Public property pages use human-readable slugs and reference IDs (`/properties/3-bhk-luxury-apartment-sigra-jr-apt-102`). Internal database UUIDs are never exposed in public URLs.
4. **Draft Privacy:** Properties in `DRAFT`, `UNDER_REVIEW`, or `ARCHIVED` status are strictly excluded from public search queries.
5. **Duplicate Prevention:** Incoming lead phone numbers are automatically checked; if a duplicate is found, the CRM flags the record and provides a non-destructive merge flow.

---

## 6. Vercel Deployment Instructions

1. Push your repository to GitHub / GitLab.
2. In the **Vercel Dashboard**, click **New Project** and select this repository.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_APP_URL`
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_STORAGE_BUCKET`
4. Set Build Command: `next build`
5. Click **Deploy**. Vercel will automatically optimize images, server actions, and API endpoints.

---

## 7. Legal & Business Confirmation Notice

> **Important Pre-Launch Requirement:**
> Business registration details, circle rate calculations, legal procedures (registry & mutation), and RERA disclaimers must be reviewed and confirmed by Mr. Umesh Yadav and qualified legal counsel before public launch. Development-only sample listings must remain tagged as sample data and kept separate from genuine live inventory.

