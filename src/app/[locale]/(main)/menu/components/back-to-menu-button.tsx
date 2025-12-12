"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function BackToMenuButton() {
  const t = useTranslations("menu");
  const searchParams = useSearchParams();

  // Preserve filters when going back to menu
  const menuUrl = `/menu${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  return (
    <Button variant="ghost" asChild className="p-0 h-auto">
      <Link
        href={menuUrl}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToMenu")}
      </Link>
    </Button>
  );
}
