"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useTranslations } from 'next-intl';

interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const t = useTranslations('menu');
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    const params = new URLSearchParams(searchParams);
    
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    
    // Reset to page 1 when changing category
    params.delete("page");
    
    const queryString = params.toString();
    router.push(`/menu${queryString ? `?${queryString}` : ""}`);
  }, [router, searchParams]);

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => handleCategorySelect(null)}
        className={`
          relative transition-all duration-200
          ${selectedCategory === null
            ? "shadow-md scale-105"
            : "hover:scale-105 hover:border-primary/50"
          }
        `}
        size="default"
      >
        {t('allItems')}
      </Button>

      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            onClick={() => handleCategorySelect(category.id)}
            className={`
              relative transition-all duration-200
              ${isSelected
                ? "shadow-md scale-105"
                : "hover:scale-105 hover:border-primary/50"
              }
            `}
            size="default"
          >
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}