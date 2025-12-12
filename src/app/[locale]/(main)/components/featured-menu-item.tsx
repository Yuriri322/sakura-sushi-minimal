"use client";

import { Button } from "@/components/ui";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface FeaturedMenuItemProps {
  item: {
    id: string;
    name: string;
    price: string;
    imageUrl: string | null;
    available: boolean;
  };
}

export function FeaturedMenuItemActions({ item }: FeaturedMenuItemProps) {
  const t = useTranslations("menu");

  const handleCallToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!item.available) return;

    // Open phone dialer
    window.location.href = "tel:0876795204";
  };

  return (
    <Button
      size="sm"
      onClick={handleCallToOrder}
      disabled={!item.available}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Phone className="h-4 w-4 mr-1" />
      <span className="text-xs">{t("call")}</span>
    </Button>
  );
}
