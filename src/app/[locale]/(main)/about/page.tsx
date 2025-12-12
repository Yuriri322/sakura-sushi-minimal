import { Card, Button, Badge } from '@/components/ui';
import {
  Sparkles,
  Heart,
  Users,
  Award,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Image from "next/image";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Our Story */}
        <Card className="p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">{t("ourStory")}</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-4">{t("storyParagraph1")}</p>
            <p className="text-muted-foreground mb-4">{t("storyParagraph2")}</p>
            <p className="text-muted-foreground">{t("storyParagraph3")}</p>
          </div>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("whatMakesUsSpecial")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t("freshDaily")}</h3>
              </div>
              <p className="text-muted-foreground">{t("freshDailyDesc")}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("madeWithPassion")}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {t("madeWithPassionDesc")}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("traditionalTechniques")}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {t("traditionalTechniquesDesc")}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t("qualityFirst")}</h3>
              </div>
              <p className="text-muted-foreground">{t("qualityFirstDesc")}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("dineInExperience")}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {t("dineInExperienceDesc")}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("communityFocused")}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {t("communityFocusedDesc")}
              </p>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2+</div>
              <div className="text-sm text-muted-foreground">
                {t("yearsExperience")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">
                {t("happyCustomers")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">
                {t("menuItems")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-sm text-muted-foreground">
                {t("averageRating")}
              </div>
            </div>
          </div>
        </Card>

        {/* Our Commitment */}
        <Card className="p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">{t("ourCommitment")}</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Badge variant="default" className="h-6 px-3">
                ✓
              </Badge>
              <div>
                <h3 className="font-semibold mb-1">
                  {t("freshnessGuaranteed")}
                </h3>
                <p className="text-muted-foreground">
                  {t("freshnessGuaranteedDesc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="default" className="h-6 px-3">
                ✓
              </Badge>
              <div>
                <h3 className="font-semibold mb-1">{t("safeHygienic")}</h3>
                <p className="text-muted-foreground">{t("safeHygienicDesc")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="default" className="h-6 px-3">
                ✓
              </Badge>
              <div>
                <h3 className="font-semibold mb-1">{t("authenticRecipes")}</h3>
                <p className="text-muted-foreground">
                  {t("authenticRecipesDesc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="default" className="h-6 px-3">
                ✓
              </Badge>
              <div>
                <h3 className="font-semibold mb-1">
                  {t("customerSatisfaction")}
                </h3>
                <p className="text-muted-foreground">
                  {t("customerSatisfactionDesc")}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Section */}
        <Card className="p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">{t("meetOurTeam")}</h2>
          <p className="text-muted-foreground mb-6">{t("teamDescription")}</p>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Founder */}
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/20 relative">
                <Image
                  src="https://vatrxjtbwwlfhidnyoof.supabase.co/storage/v1/object/public/menu-images/staff/founder.jpg"
                  alt={t("founderName")}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="font-semibold text-xl mb-1">{t("founderName")}</h3>
              <p className="text-sm text-primary font-medium mb-3">
                {t("founderTitle")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("founderDescription")}
              </p>
            </div>

            {/* Chef */}
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/20 relative">
                <Image
                  src="https://vatrxjtbwwlfhidnyoof.supabase.co/storage/v1/object/public/menu-images/staff/chef.jpg"
                  alt={t("chefName")}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="font-semibold text-xl mb-1">{t("chefName")}</h3>
              <p className="text-sm text-primary font-medium mb-3">
                {t("chefTitle")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("chefDescription")}
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">{t("ctaTitle")}</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/menu">{t("browseMenu")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
