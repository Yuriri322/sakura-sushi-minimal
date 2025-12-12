/**
 * Metadata utilities for SEO and locale-specific content
 */

import { Metadata } from 'next';

type Locale = 'en' | 'bg';

interface LocaleMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Generate locale-specific metadata
 */
export function generateMetadata(
  locale: Locale,
  metadata: LocaleMetadata
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords?.join(', '),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'bg': `${baseUrl}/bg`,
        'x-default': `${baseUrl}/bg`, // Default to Bulgarian
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      alternateLocale: locale === 'bg' ? 'en_US' : 'bg_BG',
      type: 'website',
      siteName: 'Sakura Sushi',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
  };
}

/**
 * Get default metadata by locale
 */
export function getDefaultMetadata(locale: Locale): LocaleMetadata {
  const metadata = {
    bg: {
      title: "Sakura Sushi - Автентично японско суши в Благоевград",
      description:
        "Опитайте автентично японско суши, приготвено пресно всеки ден с най-добри съставки. Ресторант в Благоевград.",
      keywords: [
        "суши",
        "сашими",
        "японска храна",
        "суши ресторант",
        "Благоевград",
        "пресно суши",
        "нигири",
        "роли",
        "японска кухня",
      ],
    },
    en: {
      title: "Sakura Sushi - Authentic Japanese Sushi in Blagoevgrad",
      description:
        "Experience authentic Japanese sushi made fresh daily with the finest ingredients. Restaurant in Blagoevgrad.",
      keywords: [
        "sushi",
        "sashimi",
        "japanese food",
        "sushi restaurant",
        "Blagoevgrad",
        "fresh sushi",
        "nigiri",
        "rolls",
        "japanese cuisine",
      ],
    },
  };

  return metadata[locale];
}

/**
 * Generate hreflang links for current page
 */
export function generateHreflangLinks(pathname: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Remove locale prefix if present
  const cleanPath = pathname.replace(/^\/(en|bg)/, '');

  return `
    <link rel="alternate" hreflang="bg" href="${baseUrl}/bg${cleanPath}" />
    <link rel="alternate" hreflang="en" href="${baseUrl}/en${cleanPath}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}/bg${cleanPath}" />
  `;
}
