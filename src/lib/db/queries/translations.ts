import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import {
  categories,
  categoryTranslations,
  menuItems,
  menuItemTranslations,
  menuItemTags,
  tags,
  tagTranslations,
} from "@/lib/db/schema";

export type Locale = "en" | "bg";

// ======================
// Categories with Translations
// ======================

export async function getCategories(locale: Locale = "bg") {
  const result = await db.query.categories.findMany({
    with: {
      translations: {
        where: eq(categoryTranslations.locale, locale),
      },
    },
    orderBy: [categories.createdAt],
  });

  return result.map((cat) => ({
    id: cat.id,
    slug: cat.slug || cat.id,
    imageUrl: cat.imageUrl,
    name: cat.translations[0]?.name || "",
    description: cat.translations[0]?.description || "",
    createdAt: cat.createdAt,
    updatedAt: cat.updatedAt,
  }));
}

export async function getCategoryById(id: string, locale: Locale = "bg") {
  const result = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: {
      translations: {
        where: eq(categoryTranslations.locale, locale),
      },
    },
  });

  if (!result) return null;

  return {
    id: result.id,
    slug: result.slug || result.id,
    imageUrl: result.imageUrl,
    name: result.translations[0]?.name || "",
    description: result.translations[0]?.description || "",
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
}

// ======================
// Menu Items with Translations
// ======================

export async function getMenuItemsWithTranslations(
  locale: Locale = "bg",
  options?: {
    categoryId?: string;
    tagIds?: string[];
    excludeTagIds?: string[];
    search?: string;
    limit?: number;
    offset?: number;
    availableOnly?: boolean;
  }
) {
  // When filtering by search or tags, we need to fetch all items first
  // then filter and apply pagination, otherwise pagination breaks
  const hasFilters =
    (options?.tagIds && options.tagIds.length > 0) ||
    (options?.excludeTagIds && options.excludeTagIds.length > 0) ||
    options?.search;

  const query = db.query.menuItems.findMany({
    where: and(
      options?.categoryId
        ? eq(menuItems.categoryId, options.categoryId)
        : undefined,
      options?.availableOnly ? eq(menuItems.available, true) : undefined
    ),
    // Only apply limit/offset if there are no search/tag filters
    limit: hasFilters ? undefined : options?.limit,
    offset: hasFilters ? undefined : options?.offset,
    orderBy: [menuItems.createdAt],
    with: {
      translations: {
        where: eq(menuItemTranslations.locale, locale),
      },
      category: {
        with: {
          translations: {
            where: eq(categoryTranslations.locale, locale),
          },
        },
      },
      menuItemTags: {
        with: {
          tag: {
            with: {
              translations: {
                where: eq(tagTranslations.locale, locale),
              },
            },
          },
        },
      },
    },
  });

  const result = await query;

  // Filter by tags if provided
  let filteredResult = result;
  if (options?.tagIds && options.tagIds.length > 0) {
    filteredResult = result.filter((item) => {
      const itemTagIds = item.menuItemTags.map((mt) => mt.tag.id);
      return options.tagIds!.some((tagId) => itemTagIds.includes(tagId));
    });
  }

  // Exclude items with certain allergen tags
  if (options?.excludeTagIds && options.excludeTagIds.length > 0) {
    filteredResult = filteredResult.filter((item) => {
      const itemTagIds = item.menuItemTags.map((mt) => mt.tag.id);
      // Keep item only if it does NOT have any of the excluded tags
      return !options.excludeTagIds!.some((tagId) =>
        itemTagIds.includes(tagId)
      );
    });
  }

  // Filter by search if provided
  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    filteredResult = filteredResult.filter((item) => {
      const name = item.translations[0]?.name || "";
      const description = item.translations[0]?.description || "";
      return (
        name.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower)
      );
    });
  }

  // Sort by popular tag first, then by creation date
  filteredResult.sort((a, b) => {
    const aHasPopular = a.menuItemTags.some((mt) => mt.tag.slug === "popular");
    const bHasPopular = b.menuItemTags.some((mt) => mt.tag.slug === "popular");

    if (aHasPopular && !bHasPopular) return -1;
    if (!aHasPopular && bHasPopular) return 1;

    // If both have or don't have popular tag, sort by creation date
    return a.createdAt.getTime() - b.createdAt.getTime();
  });

  // Apply pagination after filtering if we have filters
  if (hasFilters && options?.limit !== undefined) {
    const start = options?.offset || 0;
    const end = start + options.limit;
    filteredResult = filteredResult.slice(start, end);
  }

  return filteredResult.map((item) => ({
    id: item.id,
    slug: item.slug || item.id,
    name: item.translations[0]?.name || "",
    description: item.translations[0]?.description || "",
    price: item.price,
    priceEur: item.priceEur,
    pieces: item.pieces,
    imageUrl: item.imageUrl,
    available: item.available,
    category: item.category
      ? {
          id: item.category.id,
          name: item.category.translations[0]?.name || "",
        }
      : null,
    tags: item.menuItemTags.map((mt) => ({
      id: mt.tag.id,
      name: mt.tag.translations[0]?.name || "",
      slug: mt.tag.slug,
      icon: mt.tag.icon,
      color: mt.tag.color,
      category: mt.tag.category,
    })),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export async function getMenuItemById(id: string, locale: Locale = "bg") {
  const result = await db.query.menuItems.findFirst({
    where: eq(menuItems.id, id),
    with: {
      translations: {
        where: eq(menuItemTranslations.locale, locale),
      },
      category: {
        with: {
          translations: {
            where: eq(categoryTranslations.locale, locale),
          },
        },
      },
      menuItemTags: {
        with: {
          tag: {
            with: {
              translations: {
                where: eq(tagTranslations.locale, locale),
              },
            },
          },
        },
      },
    },
  });

  if (!result) return null;

  return {
    id: result.id,
    slug: result.slug || result.id,
    name: result.translations[0]?.name || "",
    description: result.translations[0]?.description || "",
    price: result.price,
    priceEur: result.priceEur,
    pieces: result.pieces,
    imageUrl: result.imageUrl,
    available: result.available,
    category: result.category
      ? {
          id: result.category.id,
          name: result.category.translations[0]?.name || "",
        }
      : null,
    tags: result.menuItemTags.map((mt) => ({
      id: mt.tag.id,
      name: mt.tag.translations[0]?.name || "",
      slug: mt.tag.slug,
      icon: mt.tag.icon,
      color: mt.tag.color,
      category: mt.tag.category,
    })),
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
}

// Get menu item with ALL translations for editing
export async function getMenuItemWithAllTranslations(id: string) {
  const result = await db.query.menuItems.findFirst({
    where: eq(menuItems.id, id),
    with: {
      translations: true, // Get ALL translations
      category: true,
      menuItemTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  if (!result) return null;

  // Convert translations array to object keyed by locale
  const translationsMap = result.translations.reduce((acc, t) => {
    acc[t.locale as Locale] = {
      name: t.name,
      description: t.description || "",
    };
    return acc;
  }, {} as Partial<Record<Locale, { name: string; description: string }>>);

  // Extract tag IDs from menuItemTags
  const tagIds = result.menuItemTags?.map((mit) => mit.tag.id) || [];

  return {
    id: result.id,
    slug: result.slug || result.id,
    price: result.price,
    imageUrl: result.imageUrl,
    categoryId: result.categoryId,
    available: result.available,
    translations: translationsMap,
    tagIds,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
}

export async function getMenuItemsCount(options?: {
  categoryId?: string;
  search?: string;
  tagIds?: string[];
  excludeTagIds?: string[];
}) {
  const items = await db.query.menuItems.findMany({
    where: and(
      options?.categoryId
        ? eq(menuItems.categoryId, options.categoryId)
        : undefined,
      eq(menuItems.available, true)
    ),
    with: {
      translations: true,
      menuItemTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  let filtered = items;

  // Filter by tags if provided
  if (options?.tagIds && options.tagIds.length > 0) {
    filtered = filtered.filter((item) => {
      const itemTagIds = item.menuItemTags.map((mt) => mt.tag.id);
      return options.tagIds!.some((tagId) => itemTagIds.includes(tagId));
    });
  }

  // Exclude items with certain allergen tags
  if (options?.excludeTagIds && options.excludeTagIds.length > 0) {
    filtered = filtered.filter((item) => {
      const itemTagIds = item.menuItemTags.map((mt) => mt.tag.id);
      // Keep item only if it does NOT have any of the excluded tags
      return !options.excludeTagIds!.some((tagId) =>
        itemTagIds.includes(tagId)
      );
    });
  }

  // Filter by search if provided
  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter((item) => {
      const names = item.translations.map((t) => t.name.toLowerCase());
      const descriptions = item.translations.map(
        (t) => t.description?.toLowerCase() || ""
      );
      return (
        names.some((n) => n.includes(searchLower)) ||
        descriptions.some((d) => d.includes(searchLower))
      );
    });
  }

  return filtered.length;
}

export async function getFeaturedMenuItems(
  limit: number = 4,
  locale: Locale = "bg"
) {
  const result = await db.query.menuItems.findMany({
    where: eq(menuItems.available, true),
    orderBy: [menuItems.createdAt],
    with: {
      translations: {
        where: eq(menuItemTranslations.locale, locale),
      },
      category: {
        with: {
          translations: {
            where: eq(categoryTranslations.locale, locale),
          },
        },
      },
      menuItemTags: {
        with: {
          tag: {
            with: {
              translations: {
                where: eq(tagTranslations.locale, locale),
              },
            },
          },
        },
      },
    },
  });

  // Sort by popular tag first, then by creation date
  const sorted = result.sort((a, b) => {
    const aHasPopular = a.menuItemTags.some((mt) => mt.tag.slug === "popular");
    const bHasPopular = b.menuItemTags.some((mt) => mt.tag.slug === "popular");

    if (aHasPopular && !bHasPopular) return -1;
    if (!aHasPopular && bHasPopular) return 1;

    return a.createdAt.getTime() - b.createdAt.getTime();
  });

  // Apply limit after sorting
  const limited = sorted.slice(0, limit);

  return limited.map((item) => ({
    id: item.id,
    slug: item.slug || item.id,
    name: item.translations[0]?.name || "",
    description: item.translations[0]?.description || "",
    price: item.price,
    priceEur: item.priceEur,
    imageUrl: item.imageUrl,
    available: item.available,
    category: item.category
      ? {
          id: item.category.id,
          name: item.category.translations[0]?.name || "",
        }
      : null,
    tags: item.menuItemTags.map((mt) => ({
      id: mt.tag.id,
      name: mt.tag.translations[0]?.name || "",
      slug: mt.tag.slug,
      icon: mt.tag.icon,
      color: mt.tag.color,
      category: mt.tag.category,
    })),
  }));
}

// ======================
// Tags with Translations
// ======================

export async function getTags(locale: Locale = 'bg') {
  const result = await db.query.tags.findMany({
    with: {
      translations: {
        where: eq(tagTranslations.locale, locale),
      },
    },
    orderBy: [tags.category, tags.slug],
  });

  return result.map(tag => ({
    id: tag.id,
    slug: tag.slug,
    name: tag.translations[0]?.name || '',
    icon: tag.icon,
    color: tag.color,
    category: tag.category,
    createdAt: tag.createdAt,
    updatedAt: tag.updatedAt,
  }));
}

export async function getTagById(id: string, locale: Locale = 'bg') {
  const result = await db.query.tags.findFirst({
    where: eq(tags.id, id),
    with: {
      translations: {
        where: eq(tagTranslations.locale, locale),
      },
    },
  });

  if (!result) return null;

  return {
    id: result.id,
    slug: result.slug,
    name: result.translations[0]?.name || '',
    icon: result.icon,
    color: result.color,
    category: result.category,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
}

// ======================
// UPSERT Mutations for Admin
// ======================

export async function upsertCategory(data: {
  id?: string;
  slug?: string;
  imageUrl?: string | null;
  translations: {
    en: { name: string; description?: string };
    bg: { name: string; description?: string };
  };
}) {
  return await db.transaction(async (tx) => {
    // 1. Upsert main record
    const [category] = data.id
      ? await tx.update(categories)
          .set({
            slug: data.slug,
            imageUrl: data.imageUrl,
            updatedAt: new Date(),
          })
          .where(eq(categories.id, data.id))
          .returning()
      : await tx.insert(categories)
          .values({
            slug: data.slug,
            imageUrl: data.imageUrl,
          })
          .returning();

    // 2. Upsert translations
    const locales = Object.keys(data.translations) as Locale[];

    for (const locale of locales) {
      const translation = data.translations[locale];

      await tx
        .insert(categoryTranslations)
        .values({
          categoryId: category.id,
          locale,
          name: translation.name,
          description: translation.description || null,
        })
        .onConflictDoUpdate({
          target: [categoryTranslations.categoryId, categoryTranslations.locale],
          set: {
            name: translation.name,
            description: translation.description || null,
            updatedAt: new Date(),
          },
        });
    }

    return category;
  });
}

export async function upsertMenuItem(data: {
  id?: string;
  slug?: string;
  price: string;
  imageUrl: string | null;
  categoryId: string;
  available: boolean;
  translations: {
    en?: { name: string; description?: string };
    bg?: { name: string; description?: string };
  };
  tagIds?: string[];
}) {
  return await db.transaction(async (tx) => {
    // 1. Upsert main record
    const [item] = data.id
      ? await tx.update(menuItems)
          .set({
            slug: data.slug,
            price: data.price,
            imageUrl: data.imageUrl,
            categoryId: data.categoryId,
            available: data.available,
            updatedAt: new Date(),
          })
          .where(eq(menuItems.id, data.id))
          .returning()
      : await tx.insert(menuItems)
          .values({
            slug: data.slug,
            price: data.price,
            imageUrl: data.imageUrl,
            categoryId: data.categoryId,
            available: data.available,
          })
          .returning();

    // 2. Upsert translations (only for provided languages)
    const locales = Object.keys(data.translations) as Locale[];

    for (const locale of locales) {
      const translation = data.translations[locale];

      // Skip if translation for this locale is not provided
      if (!translation) continue;

      await tx
        .insert(menuItemTranslations)
        .values({
          menuItemId: item.id,
          locale,
          name: translation.name,
          description: translation.description || null,
        })
        .onConflictDoUpdate({
          target: [menuItemTranslations.menuItemId, menuItemTranslations.locale],
          set: {
            name: translation.name,
            description: translation.description || null,
            updatedAt: new Date(),
          },
        });
    }

    // 3. Update tags if provided
    if (data.tagIds !== undefined) {
      // Delete existing tags
      await tx.delete(menuItemTags).where(eq(menuItemTags.menuItemId, item.id));

      // Insert new tags
      if (data.tagIds.length > 0) {
        await tx.insert(menuItemTags).values(
          data.tagIds.map(tagId => ({
            menuItemId: item.id,
            tagId,
          }))
        );
      }
    }

    return item;
  });
}

export async function upsertTag(data: {
  id?: string;
  slug: string;
  icon?: string | null;
  color?: string | null;
  category: 'dietary' | 'spice' | 'special' | 'allergen';
  translations: {
    en: { name: string };
    bg: { name: string };
  };
}) {
  return await db.transaction(async (tx) => {
    // 1. Upsert main record
    const [tag] = data.id
      ? await tx.update(tags)
          .set({
            slug: data.slug,
            icon: data.icon,
            color: data.color,
            category: data.category,
            updatedAt: new Date(),
          })
          .where(eq(tags.id, data.id))
          .returning()
      : await tx.insert(tags)
          .values({
            slug: data.slug,
            icon: data.icon,
            color: data.color,
            category: data.category,
          })
          .returning();

    // 2. Upsert translations
    const locales = Object.keys(data.translations) as Locale[];

    for (const locale of locales) {
      const translation = data.translations[locale];

      await tx
        .insert(tagTranslations)
        .values({
          tagId: tag.id,
          locale,
          name: translation.name,
        })
        .onConflictDoUpdate({
          target: [tagTranslations.tagId, tagTranslations.locale],
          set: {
            name: translation.name,
            updatedAt: new Date(),
          },
        });
    }

    return tag;
  });
}
