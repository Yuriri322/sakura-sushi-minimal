# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**sakura-sushi-minimal** is a simple restaurant menu display website. It shows menu items with categories, descriptions, prices, and "Call to Order" buttons. Menu items are managed directly through Supabase Table Editor.

## Quick Start Commands

```bash
# Development
yarn dev                  # Start dev server (uses --turbopack)
yarn build                # Build for production
yarn start                # Start production server
yarn lint                 # Run ESLint

# Database (Drizzle ORM)
yarn db:push              # Push schema changes to database
yarn db:studio            # Open Drizzle Studio to view/edit menu items
npx tsx scripts/seed.ts   # Seed sample menu data

# Type checking
npx tsc --noEmit          # Run TypeScript type checker
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL (Supabase) - **For menu data only, no auth**
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Animations**: Framer Motion
- **State Management**: Zustand (for menu filtering only)
- **Internationalization**: next-intl v4 (Bulgarian/English)
- **Package Manager**: Yarn v4 (Berry)

## What This Project IS

✅ **A simple menu display website**
- View menu items by category
- Filter and search menu
- Click to call or email for orders
- Bilingual support (Bulgarian/English)

## What This Project IS NOT

❌ No shopping cart
❌ No checkout or payments
❌ No admin panel
❌ No authentication
❌ No order management system
❌ No customer accounts

## Architecture Overview

### Internationalization (i18n)

The app uses **next-intl** with route-based localization:

- **Supported locales**: Bulgarian (`bg`) - default, English (`en`)
- **URL structure**: All routes prefixed with locale: `/bg/menu`, `/en/menu`
- **Routing setup** (`src/i18n/routing.ts`):
  - Exports locale-aware `Link`, `usePathname`, `useRouter`, and `redirect`
  - Always use these from `@/i18n/routing` instead of `next/navigation` for localized routes

**Translation files**:
- `locales/bg.json` - Bulgarian translations
- `locales/en.json` - English translations

**Usage patterns**:
```typescript
// Server Components
import { getTranslations } from 'next-intl/server';
const t = await getTranslations({ locale, namespace: 'menu' });

// Client Components
import { useTranslations, useLocale } from 'next-intl';
const t = useTranslations('menu');
const locale = useLocale();
```

### Database Architecture

**Multilingual content strategy**:
- Core tables store language-agnostic data (`menu_items`, `categories`, `tags`)
- Separate translation tables store localized content (`menu_item_translations`, etc.)
- Each translation has `locale` field ('bg' | 'en') with unique constraint per entity

**Database tables** (`src/lib/db/schema.ts`):

1. **categories** - Menu categories (Sushi, Rolls, etc.)
   - `id`, `slug`, `imageUrl`, `createdAt`, `updatedAt`

2. **category_translations** - Localized category data
   - `id`, `categoryId`, `locale`, `name`, `description`

3. **menu_items** - Menu products
   - `id`, `slug`, `price`, `imageUrl`, `categoryId`, `available`

4. **menu_item_translations** - Localized menu item data
   - `id`, `menuItemId`, `locale`, `name`, `description`

5. **tags** - Dietary/special tags (vegetarian, spicy, etc.)
   - `id`, `slug`, `icon`, `color`, `category`

6. **tag_translations** - Localized tag names
   - `id`, `tagId`, `locale`, `name`

7. **menu_item_tags** - Junction table linking menu items to tags
   - `menuItemId`, `tagId`

### Managing Menu Items

**All menu management is done through Supabase Table Editor:**

1. Go to Supabase Dashboard → Table Editor
2. Edit tables directly:
   - Add menu items in `menu_items` table
   - Add translations in `menu_item_translations` (one row per locale)
   - Link tags in `menu_item_tags` table

**Example: Adding a new menu item**
1. Insert into `menu_items`: price, imageUrl, categoryId, slug
2. Insert into `menu_item_translations` (2 rows):
   - One with `locale='bg'`, name and description in Bulgarian
   - One with `locale='en'`, name and description in English
3. Optionally insert into `menu_item_tags` to add tags

### Animation System

**Components** (`src/components/animations/`):

1. **AnimatedList / AnimatedListItem** - Static content with re-animation
2. **DynamicList / DynamicListItem** - Dynamic content (add/remove items)
3. **FadeIn** - Single element fade-in
4. **StaggerContainer / StaggerItem** - Sequential animations
5. **ScaleOnHover** - Hover scale effect
6. **PageTransition** - Page-level transitions

**Import pattern**:
```typescript
import { AnimatedList, AnimatedListItem } from '@/components/animations';
```

### Menu Display & Ordering Flow

**Customer Experience**:
1. Browse menu at `/[locale]/menu`
2. View product details at `/[locale]/menu/[id]`
3. Click "Call to Order" → Opens phone dialer (`tel:0876795204`)
4. Or click "Email Order" → Opens email client with pre-filled template

**Menu Components**:
- `menu-item-actions.tsx` - "Call to Order" button
- `featured-menu-item.tsx` - Featured items with call action
- `product-detail-client.tsx` - Product page with call/email buttons

**Contact Page**:
- `/[locale]/contact` - "How to Order" section with phone/email CTAs

## Code Conventions

### Server Components by Default

Use `"use client"` directive only when needed:
- Using React hooks (useState, useEffect, etc.)
- Using Framer Motion animations
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window.location, etc.)

### Next.js 15 Async Params

Route params are now async in Next.js 15:
```typescript
export default async function Page({
  params
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id, locale } = await params;
  // ...
}
```

### Import Patterns

**UI components** - Use barrel export:
```typescript
import { Button, Card, Badge, Input } from '@/components/ui';
```

**Animations** - Use barrel export:
```typescript
import { FadeIn, AnimatedList } from '@/components/animations';
```

**Locale-aware navigation**:
```typescript
import { Link, redirect } from '@/i18n/routing';
// NOT from 'next/navigation'
```

## Environment Setup

Required `.env.dev` variables:

```bash
# Supabase Database (pooler connection for Drizzle)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Note**: No Supabase Auth variables needed - we don't use authentication!

## Common Workflows

### Seeding Sample Data

```bash
npx tsx scripts/seed.ts
```

This creates:
- 4 categories (Sushi, Rolls, Sashimi, Appetizers)
- 7 sample menu items with Bulgarian and English translations
- 3 tags (Vegetarian, Spicy, Popular)

### Managing Menu Content

1. **Via Supabase Table Editor** (Recommended):
   - Go to Supabase Dashboard
   - Navigate to Table Editor
   - Edit tables directly

2. **Via Drizzle Studio**:
   ```bash
   yarn db:studio
   ```
   - Opens local web UI to browse/edit database

### Updating Translations

When adding translatable content:
1. Add keys to both `locales/bg.json` and `locales/en.json`
2. Use namespace-based keys: `menu.title`, `contact.phone`
3. Dynamic values: `{variable}` syntax
4. Import with `useTranslations(namespace)` or `getTranslations({ locale, namespace })`

## Deployment

**Platform**: Vercel (recommended)

**Deployment checklist**:
1. Set `DATABASE_URL` environment variable in Vercel dashboard
2. Run `yarn db:push` to sync schema to production database
3. Seed menu data via Supabase SQL Editor or run seed script
4. Update phone number `0876795204` to your restaurant's number
5. Update email `info@sakurasushi.bg` to your restaurant's email

## Important Notes

- **No authentication** - This is a public-facing menu only
- **Menu images**: Use URLs (Unsplash or upload to Supabase Storage)
- **Prices**: Stored as decimal strings, always in BGN
- **Orders**: Customers call or email - no online ordering system
- **Contact info**: Update phone `0876795204` and email `info@sakurasushi.bg` throughout codebase

## File Structure

```
src/
├── app/
│   ├── [locale]/        # Localized routes (menu, contact, etc.)
│   └── not-found.tsx    # 404 page
├── components/
│   ├── animations/      # Reusable animation components
│   ├── ui/              # shadcn/ui components
│   └── [feature]/       # Feature-specific components
├── lib/
│   ├── db/
│   │   ├── schema.ts    # Database schema (Drizzle)
│   │   └── queries.ts   # Database queries
│   └── stores/          # Zustand stores (menu filter only)
├── i18n/
│   └── routing.ts       # i18n configuration
└── locales/
    ├── bg.json          # Bulgarian translations
    └── en.json          # English translations
```

## Troubleshooting

**TypeScript errors**: Run `npx tsc --noEmit` to see all errors
**Database connection**: Verify `DATABASE_URL` is URL-encoded and uses pooler connection
**Translations missing**: Ensure key exists in both `bg.json` and `en.json`
**Wrong locale shown**: Check URL includes `/bg/` or `/en/` prefix
**Images not loading**: Add hostname to `next.config.ts` image remotePatterns

---

**Last updated**: December 2025
**Project**: sakura-sushi-minimal (menu display only - no admin/auth)
