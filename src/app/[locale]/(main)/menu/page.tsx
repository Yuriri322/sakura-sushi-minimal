import { getCategories, getMenuItemsWithTags, getMenuItemsCount, getTags, type Locale } from "@/lib/db/queries";
import { MenuGrid } from "./components/menu-grid";
import { CategoryFilter } from "./components/category-filter";
import { TagFilter } from "./components/tag-filter";
import { Suspense } from "react";
import { PaginationControls } from "./components/pagination-controls";
import { getTranslations } from 'next-intl/server';

interface MenuPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    tags?: string;
    excludeAllergens?: string;
  }>;
}

// Enable ISR for better performance
export const revalidate = 1800; // Revalidate every 30 minutes

export default async function MenuPage({
  params,
  searchParams,
}: MenuPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });
  const {
    page = "1",
    category,
    search,
    tags: tagsParam,
    excludeAllergens: excludeAllergensParam,
  } = await searchParams;
  const currentPage = parseInt(page, 10);
  const itemsPerPage = 24;
  const offset = (currentPage - 1) * itemsPerPage;
  const tagIds = tagsParam?.split(",").filter(Boolean) || undefined;
  const excludeAllergenIds =
    excludeAllergensParam?.split(",").filter(Boolean) || undefined;

  const [categories, allTags, menuItems, totalItems] = await Promise.all([
    getCategories(locale as Locale),
    getTags(locale as Locale),
    getMenuItemsWithTags(locale as Locale, {
      limit: itemsPerPage,
      offset,
      categoryId: category,
      tagIds,
      excludeTagIds: excludeAllergenIds,
      search,
      availableOnly: true,
    }),
    getMenuItemsCount({
      categoryId: category,
      search,
      tagIds,
      excludeTagIds: excludeAllergenIds,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="py-6 sm:py-8 lg:py-10">
      {/* Header - Centered */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            {t("showingItems", { count: menuItems.length, total: totalItems })}
          </div>
        </div>
      </div>

      {/* Main Container - Categories and Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <Suspense
            fallback={<div className="animate-pulse h-12 bg-card rounded-lg" />}
          >
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        {/* Layout: Tags Sidebar + Menu Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          {/* Left Sidebar - Tag Filter */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            {/* Tag Filter - Secondary Filter */}
            <Suspense
              fallback={
                <div className="animate-pulse h-96 bg-card rounded-lg" />
              }
            >
              <TagFilter tags={allTags} />
            </Suspense>
          </aside>

          {/* Main Content - Menu Grid */}
          <div className="min-w-0">
            {/* Menu Items Grid */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {Array.from({ length: itemsPerPage }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[4/3] bg-card rounded-lg mb-4" />
                      <div className="h-4 bg-card rounded mb-2" />
                      <div className="h-3 bg-card rounded w-3/4 mb-3" />
                      <div className="h-6 bg-card rounded w-1/2" />
                    </div>
                  ))}
                </div>
              }
            >
              <MenuGrid
                menuItems={menuItems}
                pageKey={`page-${currentPage}-${category || "all"}-${
                  search || ""
                }-${tagsParam || ""}-${excludeAllergensParam || ""}`}
              />
            </Suspense>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12 flex justify-center">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}