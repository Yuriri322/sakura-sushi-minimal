"use client";

import { MenuItemCard } from "./menu-item-card";
import { useTranslations } from "next-intl";

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
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    color: string | null;
    category: string;
  }>;
}

interface MenuGridClientProps {
  menuItems: MenuItem[];
}

// Note: Filtering is handled server-side via URL params
// This component just renders the pre-filtered items
export function MenuGridClient({ menuItems }: MenuGridClientProps) {
  const t = useTranslations("menu");

  if (menuItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐟</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t("noItemsFound")}
        </h3>
        <p className="text-muted-foreground">{t("tryDifferentCategory")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}