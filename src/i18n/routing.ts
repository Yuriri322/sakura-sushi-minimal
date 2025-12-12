import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'bg'],

  // Used when no locale matches
  defaultLocale: 'bg',

  // Always show the locale prefix (e.g. /en/menu, /bg/menu)
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
const navigation = createNavigation(routing);

export const { Link, usePathname, useRouter } = navigation;

// Export redirect with proper type for Server Components
// The runtime function accepts a string pathname, but the types are overly strict
export const redirect = navigation.redirect as unknown as (pathname: string) => never;
