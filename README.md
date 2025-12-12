# Sakura Sushi 🌸

A modern, performant restaurant website built with Next.js 15, featuring a beautiful bilingual menu showcase with advanced filtering and search capabilities.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![React](https://img.shields.io/badge/React-19-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Customer Experience
- 🍱 **Interactive Menu** - Browse sushi offerings with category filters, tags, and allergen filters
- 📱 **Mobile First** - Fully responsive design optimized for all devices
- 🌍 **Bilingual Support** - Complete Bulgarian and English localization with next-intl
- 🎯 **Smart Filtering** - Filter by category, dietary preferences, and exclude allergens
- 🔍 **Search** - Find menu items quickly
- 🏷️ **Rich Tags** - Vegetarian, vegan, spicy, allergen indicators
- 💰 **Dual Currency** - Display prices in both BGN and EUR
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations
- ⚡ **Fast Performance** - Optimized with ISR, image optimization, and React Compiler

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

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Auth**: Supabase Auth (admin only)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **i18n**: next-intl (bg/en)

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/       # Customer routes (bg/en)
│   │   └── (main)/     # Landing, menu, contact
│   ├── admin/          # Admin panel
│   └── api/            # API routes
├── components/         # React components
├── lib/               # Utilities, DB, auth
└── i18n/              # Translations config

locales/               # Translation files
public/                # Static assets
```

## 🛠️ Scripts

```bash
yarn dev          # Development server
yarn build        # Production build
yarn start        # Production server
yarn lint         # ESLint

yarn db:push      # Update database schema
yarn db:studio    # Open Drizzle Studio
yarn db:generate  # Generate migrations
```

## 🎨 Customization

### Contact Information

Update phone/email:
- Search for `0876795204` → replace
- Search for `info@sakurasushi.bg` → replace
- Update translations in `locales/bg.json` and `locales/en.json`

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Required Environment Variables

```env
DATABASE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_BASE_URL
```

## 📝 Database Schema Changes

### Orders Table
- ✅ Added: `isPaid`, `paymentMethod`, `orderSource`, `createdBy`
- ✅ Modified: `customerPhone` now required
- ❌ Removed: Stripe fields, complex payment status

### Users Table
- ❌ Removed: Stripe customer ID

## 📖 Documentation

See `CLAUDE.md` for detailed development documentation.

## 📄 License

MIT

## 🤝 Contributing

This minimal version is focused on simple restaurant websites. For full e-commerce features, see the main sakura-sushi project.
