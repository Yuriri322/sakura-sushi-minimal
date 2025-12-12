'use client';

import { FadeIn } from '@/components/animations';

interface SectionTitleProps {
  title: string;
  description: string;
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <FadeIn delay={0.1}>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {title}
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </FadeIn>
    </div>
  );
}
