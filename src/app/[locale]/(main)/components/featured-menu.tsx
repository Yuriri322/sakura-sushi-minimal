'use client';

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FeaturedMenuItemActions } from "./featured-menu-item";
import { AnimatedList, AnimatedListItem } from "@/components/animations";

interface FeaturedItem {
  id: string;
  name: string;
  description: string | null;
  price: string;
  priceEur: string | null;
  imageUrl: string | null;
  available: boolean;
  category: {
    id: string;
    name: string;
  } | null;
}

interface FeaturedMenuProps {
  featuredItems: FeaturedItem[];
}

export function FeaturedMenu({ featuredItems }: FeaturedMenuProps) {

  return (
    <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {featuredItems.map((item) => (
        <AnimatedListItem key={item.id}>
          <Card className="group overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
            <Link href={`/menu/${item.id}`} className="block">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                    <div className="text-4xl">🐟</div>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              {item.category && (
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {item.category.name}
                </div>
              )}
              <Link href={`/menu/${item.id}`}>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    {parseFloat(item.price).toFixed(2)} лв
                  </span>
                  {item.priceEur && (
                    <span className="text-xs text-muted-foreground">
                      €{parseFloat(item.priceEur).toFixed(2)}
                    </span>
                  )}
                </div>
                <FeaturedMenuItemActions item={item} />
              </div>
            </div>
          </Card>
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}