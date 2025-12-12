'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { MenuItemActions } from "./menu-item-actions";
import { TagBadge } from "@/components/ui/tag-badge";
import { useTranslations } from 'next-intl';
import { useSearchParams } from "next/navigation";

interface Tag {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  category: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: string;
  priceEur: string | null;
  pieces: number | null;
  imageUrl: string | null;
  available: boolean;
  category: {
    id: string;
    name: string;
  } | null;
  tags?: Tag[];
}

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const t = useTranslations("menu");
  const searchParams = useSearchParams();

  // Preserve current filters when navigating to product detail
  const itemUrl = `/menu/${item.id}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  return (
    <Card className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full sm:hover:-translate-y-1">
      {/* Clickable overlay for entire card */}
      <Link href={itemUrl} prefetch={true} className="block">
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover sm:group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center transition-all duration-300 sm:group-hover:from-primary/10 sm:group-hover:to-primary/5">
              <div className="text-4xl sm:group-hover:scale-110 transition-transform duration-300">
                🐟
              </div>
            </div>
          )}

          {/* Availability badge */}
          {!item.available && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground shadow-md"
            >
              {t("outOfStock")}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Category */}
          {item.category && (
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {item.category.name}
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 sm:group-hover:text-primary transition-colors line-clamp-1 text-base sm:text-lg">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 3).map((tag) => (
                <TagBadge
                  key={tag.id}
                  name={tag.name}
                  icon={tag.icon}
                  color={tag.color}
                  size="sm"
                />
              ))}
              {item.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Price and Pieces */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-primary">
                {parseFloat(item.price).toFixed(2)} лв
              </span>
              {item.priceEur && (
                <span className="text-sm text-muted-foreground">
                  {parseFloat(item.priceEur).toFixed(2)} €
                </span>
              )}
            </div>
            {item.pieces && (
              <span className="text-sm text-muted-foreground">
                {item.pieces} {t("pieces")}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart button - always visible on mobile, hover on desktop */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <MenuItemActions item={item} />
      </div>
    </Card>
  );
}