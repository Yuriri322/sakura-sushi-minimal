// Re-export all queries from translation-aware implementation
export {
  getCategories,
  getCategoryById,
  getMenuItemsWithTranslations as getMenuItemsWithTags,
  getMenuItemById,
  getMenuItemWithAllTranslations,
  getMenuItemsCount,
  getFeaturedMenuItems,
  getTags,
  getTagById,
  upsertCategory,
  upsertMenuItem,
  upsertTag,
  type Locale,
} from "./queries/translations";