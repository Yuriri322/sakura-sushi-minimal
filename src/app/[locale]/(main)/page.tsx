import { getFeaturedMenuItems, type Locale } from '@/lib/db/queries';
import { FeaturedMenuClient } from './components/featured-menu-client';
import { HeroSection } from './components/hero-section';
import { SectionTitle } from "./components/section-title";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  generateMetadata as generateMeta,
  getDefaultMetadata,
} from "@/lib/utils/metadata";
import { Metadata } from "next";

// Enable ISR for better performance
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getDefaultMetadata(locale as "en" | "bg");
  return generateMeta(locale as "en" | "bg", metadata);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const featuredItems = await getFeaturedMenuItems(4, locale as Locale);

  return (
    <div className="min-h-screen">
      {/* Hero/Promo Section */}
      <HeroSection />

      {/* Menu Section */}
      <section id="menu" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("featuredTitle")}
            description={t("featuredDescription")}
          />

          <FeaturedMenuClient featuredItems={featuredItems} />

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/menu" locale={locale} className="px-8">
                {t("viewFullMenu")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
