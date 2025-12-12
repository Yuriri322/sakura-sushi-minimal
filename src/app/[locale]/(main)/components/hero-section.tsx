'use client';

import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { FadeIn } from '@/components/animations';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative bg-gradient-to-br from-background via-card to-background border-b border-border/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1} direction="down">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              {t('heroTitle')}
              <span className="block text-primary mt-2">{t('heroSubtitle')}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('heroDescription')}
            </p>
          </FadeIn>

          <FadeIn delay={0.5} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="px-8 py-3 text-lg group">
                <Link href="/menu" className="flex items-center gap-2">
                  {t('orderNow')} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
