import { getRequestConfig } from "next-intl/server";

// Supported locales
export const locales = ["en", "bg"] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = "bg";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming locale is valid, fallback to default if not
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
