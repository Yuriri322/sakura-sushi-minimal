'use client';

import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { TagBadge } from '@/components/ui/tag-badge';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from "lucide-react";
import { useTranslations } from 'next-intl';

interface Tag {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  category: string;
}

interface TagFilterProps {
  tags: Tag[];
}

export function TagFilter({ tags }: TagFilterProps) {
  const t = useTranslations('menu');
  const tCategories = useTranslations('categories');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTagIds =
    searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const excludedAllergenIds =
    searchParams.get("excludeAllergens")?.split(",").filter(Boolean) || [];

  // Group tags by category, separating allergens
  const tagsByCategory = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  // Get allergen tags separately
  const allergenTags = tagsByCategory["allergen"] || [];
  const nonAllergenCategories = Object.entries(tagsByCategory).filter(
    ([category]) => category !== "allergen"
  );

  const handleTagToggle = (tagId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newTagIds = [...selectedTagIds];

    if (newTagIds.includes(tagId)) {
      newTagIds = newTagIds.filter((id) => id !== tagId);
    } else {
      newTagIds.push(tagId);
    }

    if (newTagIds.length > 0) {
      params.set("tags", newTagIds.join(","));
    } else {
      params.delete("tags");
    }

    // Reset to page 1 when changing filters
    params.delete("page");

    router.push(`/menu?${params.toString()}`);
  };

  const handleAllergenToggle = (tagId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newExcludedIds = [...excludedAllergenIds];

    if (newExcludedIds.includes(tagId)) {
      newExcludedIds = newExcludedIds.filter((id) => id !== tagId);
    } else {
      newExcludedIds.push(tagId);
    }

    if (newExcludedIds.length > 0) {
      params.set("excludeAllergens", newExcludedIds.join(","));
    } else {
      params.delete("excludeAllergens");
    }

    // Reset to page 1 when changing filters
    params.delete("page");

    router.push(`/menu?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tags");
    params.delete("excludeAllergens");
    params.delete("page");
    router.push(`/menu?${params.toString()}`);
  };

  const hasActiveFilters =
    selectedTagIds.length > 0 || excludedAllergenIds.length > 0;

  if (tags.length === 0) return null;

  return (
    <div className="bg-card rounded-lg p-4 sm:p-5 border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          {t("filterByTags")}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-7 text-xs px-2 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-3 w-3 mr-1" />
            {tCommon("clear")}
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Allergen Exclusion Section */}
        {allergenTags.length > 0 && (
          <div className="pb-4 border-b border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h4 className="text-xs font-medium text-foreground uppercase tracking-wide">
                {t("excludeAllergens")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {t("excludeAllergensDescription")}
            </p>
            <div className="flex flex-wrap gap-2">
              {allergenTags.map((tag) => {
                const isExcluded = excludedAllergenIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleAllergenToggle(tag.id)}
                    className={`
                      rounded-md transition-all duration-200 ease-out
                      hover:scale-[1.03] active:scale-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2
                      ${
                        isExcluded
                          ? "ring-2 ring-destructive shadow-lg scale-[1.03]"
                          : "opacity-60 hover:opacity-100 hover:shadow-md"
                      }
                    `}
                  >
                    <TagBadge
                      name={tag.name}
                      icon={tag.icon}
                      color={tag.color}
                      size="sm"
                      className={isExcluded ? "line-through opacity-70" : ""}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Tag Filters */}
        {nonAllergenCategories.map(([category, categoryTags]) => (
          <div key={category}>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2.5">
              {tCategories(category)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categoryTags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`
                      rounded-md transition-all duration-200 ease-out
                      hover:scale-[1.03] active:scale-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                      ${
                        isSelected
                          ? "shadow-lg scale-[1.03]"
                          : "opacity-60 hover:opacity-100 hover:shadow-md"
                      }
                    `}
                  >
                    <TagBadge
                      name={tag.name}
                      icon={tag.icon}
                      color={tag.color}
                      size="sm"
                      className={
                        isSelected ? "brightness-150 saturate-150" : ""
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
