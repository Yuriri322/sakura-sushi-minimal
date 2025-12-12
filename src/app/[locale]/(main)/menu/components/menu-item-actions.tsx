"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  available: boolean;
}

interface MenuItemActionsProps {
  item: MenuItem;
}

export function MenuItemActions({ item }: MenuItemActionsProps) {
  const t = useTranslations("menu");

  const handleCallToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item.available) return;

    // Open phone dialer
    window.location.href = "tel:0876795204";
  };

  return (
    <Button
      size="sm"
      onClick={handleCallToOrder}
      disabled={!item.available}
      className="bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      <Phone className="h-4 w-4 mr-1" />
      {t("callToOrder")}
    </Button>
  );
}
