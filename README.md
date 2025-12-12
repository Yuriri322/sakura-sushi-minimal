# Sakura Sushi 🌸

A modern, p- 🚀 **Next.js 16** - Latest features including React Server Components & optimized security
- ⚛️ **React 19** - With React Compiler for automatic optimizations
- 🗄️ **PostgreSQL** - Via Supabase with Drizzle ORM
- 🎯 **Type Safety** - Full TypeScript coverage with Zod validation
- 📊 **ISR** - 30-minute revalidation for optimal performance
- 🖼️ **Image Optimization** - WebP/AVIF with responsive sizes from Supabase Storage
- 🔒 **Security Headers** - HSTS, X-Frame-Options, CSP-ready, and more
- 📦 **Optimized Bundles** - Package imports and tree-shaking optimizations
- 🔐 **Zero Vulnerabilities** - Updated to address CVE-2025-66478n-ready restaurant website built with Next.js 16, featuring a beautiful bilingual menu showcase with EU-compliant allergen information and advanced filtering capabilities.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**🔗 Live Demo:** [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Yuriri322/sakura-sushi-minimal)

**📦 Repository:** [github.com/Yuriri322/sakura-sushi-minimal](https://github.com/Yuriri322/sakura-sushi-minimal)

## ✨ Features

### Customer Experience
- 🍱 **Interactive Menu** - Browse 49 menu items across 10 categories
- 📱 **Mobile First** - Fully responsive design optimized for all devices
- 🌍 **Bilingual Support** - Complete Bulgarian and English localization with next-intl
- 🎯 **Smart Filtering** - Filter by category, dietary preferences, and exclude allergens
- 🔍 **Search** - Real-time search across menu items
- 🏷️ **Rich Tags** - Vegetarian, vegan, spicy, popular indicators
- ⚠️ **EU Allergen Compliance** - 14 standardized allergen types (Gluten, Crustaceans, Eggs, Fish, Peanuts, Soy, Dairy, Nuts, Celery, Mustard, Sesame, Sulfites, Lupin, Molluscs)
- 💰 **Dual Currency** - Automatic BGN to EUR conversion (1.9558 rate)
- 🎨 **Beautiful UI** - Modern dark theme with smooth Framer Motion animations
- ⚡ **Fast Performance** - Optimized with ISR, image optimization, and React Compiler
- 👥 **Team Showcase** - Meet the founder and chef with profile images

### Technical Highlights
- � **Next.js 15** - Latest features including React Server Components
- ⚛️ **React 19** - With React Compiler for automatic optimizations
- �️ **PostgreSQL** - Via Supabase with Drizzle ORM
- 🎯 **Type Safety** - Full TypeScript coverage with Zod validation
- � **ISR** - Incremental Static Regeneration for optimal performance
- 🖼️ **Image Optimization** - WebP/AVIF with responsive sizes
- 🔒 **Security Headers** - Production-ready security configuration
- 📦 **Optimized Bundles** - Package imports and tree-shaking optimizations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn 4.x
- Supabase account (database + admin auth)

### Installation

1. **Install dependencies**
```bash
cd sakura-sushi-minimal
yarn install
```

2. **Set up environment**
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`

3. **Set up database**
```bash
yarn db:push
```

4. **Run development server**
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Create Admin User

1. Visit `/admin/login` and sign up
2. Run `yarn db:studio`
3. Find your user in `users` table
4. Change `role` to `'admin'`

## 📚 Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19.1.0
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle ORM 0.44.4
- **Styling**: Tailwind CSS v4 + Radix UI
- **Animations**: Framer Motion 12
- **i18n**: next-intl 4.3.12 (Bulgarian/English)
- **Image Storage**: Supabase Storage
- **Package Manager**: Yarn 4.9.2

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Localized routes (bg/en)
│   │   └── (main)/         # Main pages
│   │       ├── page.tsx    # Homepage with featured menu
│   │       ├── about/      # About page with team
│   │       ├── contact/    # Contact page
│   │       └── menu/       # Full menu with filters
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── animations/         # Framer Motion animations
│   ├── layout/            # Header, navigation
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── i18n/                  # i18n configuration
└── lib/
    ├── constants/         # App constants
    ├── db/               # Database schema & queries
    ├── stores/           # Zustand stores
    └── utils/            # Utility functions

locales/                  # Translation files (bg.json, en.json)
scripts/                  # Database seeding scripts
public/                   # Static assets
```

## 🛠️ Scripts

```bash
# Development
yarn dev                # Start development server (with Turbopack)
yarn build             # Create production build
yarn start             # Start production server
yarn lint              # Run ESLint
yarn lint:fix          # Fix ESLint issues
yarn type-check        # TypeScript type checking

# Database
yarn db:push           # Push schema changes to database
yarn db:push:prod      # Push schema to production
yarn db:studio         # Open Drizzle Studio (local)
yarn db:studio:prod    # Open Drizzle Studio (production)
yarn db:generate       # Generate migrations
yarn db:seed           # Seed database with full menu (49 items)
```

## 🎨 Customization

### Contact Information

Update phone/email in translation files:
- **Phone**: Search for `087 679 5204` in `locales/bg.json` and `locales/en.json`
- **Email**: Search for `sakurasushi.bg@gmail.com` and replace
- **Address**: Update in contact page translations

### Menu Items

1. Update `scripts/seed-full-menu.ts` with your menu
2. Run `yarn db:seed` to update database
3. Upload images to Supabase Storage: `menu-images/menu-items/`

### Team Members

Update team photos in Supabase Storage:
- Path: `menu-images/staff/founder.jpg`
- Path: `menu-images/staff/chef.jpg`
- Update translations in `locales/*/json` under `about` namespace

### Allergen Information

All allergens follow EU standard (14 types). Update in `scripts/seed-full-menu.ts`:
- Tags section defines allergen types
- Each menu item includes relevant allergen tags

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Yuriri322/sakura-sushi-minimal)

**Quick Deploy:**

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Add environment variables (see below)
4. Deploy!

**Manual Deploy:**

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure environment variables
5. Deploy

📖 **Detailed deployment guide:** See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### Required Environment Variables

```env
# Database (Required)
DATABASE_URL=postgresql://user:password@host:port/database

# Supabase (Required for image storage)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Application (Optional)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

💡 **Tip:** Use the `.env.vercel.template` file as a reference for setting up environment variables in Vercel.

### Post-Deployment Steps

1. **Seed your database:**
   ```bash
   ENV=prod npm run db:seed
   ```

2. **Upload images to Supabase Storage:**
   - Create bucket: `menu-images` (public)
   - Upload menu item images to `menu-items/`
   - Upload category images to `categories/`
   - Upload staff photos to `staff/`

3. **Verify deployment:**
   - Check homepage loads
   - Test menu page with filters
   - Verify language switching (EN/BG)
   - Test mobile responsiveness

## 📊 Database Schema

### Core Tables

**categories**
- Stores menu categories (Uramaki, Gunkan, Nigiri, etc.)
- Includes translations for BG/EN

**menu_items**
- 49 items with prices in BGN and EUR
- Linked to categories and tags
- Image URLs from Supabase Storage

**tags**
- 18 tags including:
  - Dietary: Vegetarian, Vegan
  - Special: Popular, Spicy
  - Allergens: 14 EU standard types

**translations**
- Separate tables for category, menu item, and tag translations
- Supports BG and EN locales

## 📖 Documentation

- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[VERCEL_CHECKLIST.md](VERCEL_CHECKLIST.md)** - Quick deployment checklist  
- **[READY_TO_DEPLOY.md](READY_TO_DEPLOY.md)** - Deployment readiness summary
- **[CLAUDE.md](CLAUDE.md)** - Detailed development documentation

## 🎯 Features Showcase

### Menu System
- 10 categories: Uramaki, Gunkan, Hosomaki, Hot Rolls, Nigiri, Wok, Hot Bowls, Soups, Hot Appetizers, Poke
- 49 menu items with detailed descriptions
- Real-time search and filtering
- EU-compliant allergen labeling

### Localization
- Complete Bulgarian and English translations
- Automatic locale detection (disabled to prevent unwanted switches)
- Locale persistence across navigation
- Currency conversion (BGN ⇄ EUR)

### Performance
- Lighthouse score: 90+ (Performance, Accessibility, Best Practices, SEO)
- ISR with 30-minute revalidation
- Optimized images (WebP/AVIF)
- React Compiler enabled
- Bundle size optimized with tree-shaking

### Security
- Updated to Next.js 16.0.10 (fixes CVE-2025-66478)
- Security headers configured
- HSTS enabled
- XSS protection
- Clean git history (no exposed secrets)

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Sakura Sushi Team**
- Website: [sakurasushi.bg](https://sakurasushi.bg)
- Email: sakurasushi.bg@gmail.com
- Phone: 087 679 5204

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!
