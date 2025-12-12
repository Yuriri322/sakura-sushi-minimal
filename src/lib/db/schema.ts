import { pgTable, text, integer, decimal, timestamp, boolean, uuid, index, unique } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug"), // Language-independent identifier for URLs
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug"), // Language-independent identifier for URLs
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  priceEur: decimal("price_eur", { precision: 10, scale: 2 }),
  pieces: integer("pieces"), // Number of pieces (e.g., 6 for sushi, 1 for nigiri)
  imageUrl: text("image_url"),
  categoryId: uuid("category_id").references(() => categories.id),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // Language-independent identifier for URLs
  icon: text("icon"),
  color: text("color"),
  category: text("category", {
    enum: ["dietary", "spice", "special", "allergen"],
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menuItemTags = pgTable(
  "menu_item_tags",
  {
    menuItemId: uuid("menu_item_id")
      .notNull()
      .references(() => menuItems.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: index("menu_item_tags_pk").on(table.menuItemId, table.tagId),
  })
);

// Translation tables
export const categoryTranslations = pgTable(
  "category_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(), // 'en' | 'bg'
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.categoryId, table.locale)]
);

export const menuItemTranslations = pgTable(
  "menu_item_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    menuItemId: uuid("menu_item_id")
      .notNull()
      .references(() => menuItems.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(), // 'en' | 'bg'
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.menuItemId, table.locale)]
);

export const tagTranslations = pgTable(
  "tag_translations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(), // 'en' | 'bg'
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.tagId, table.locale)]
);

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  menuItems: many(menuItems),
  translations: many(categoryTranslations),
}));

export const categoryTranslationsRelations = relations(
  categoryTranslations,
  ({ one }) => ({
    category: one(categories, {
      fields: [categoryTranslations.categoryId],
      references: [categories.id],
    }),
  })
);

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
  translations: many(menuItemTranslations),
  menuItemTags: many(menuItemTags),
}));

export const menuItemTranslationsRelations = relations(
  menuItemTranslations,
  ({ one }) => ({
    menuItem: one(menuItems, {
      fields: [menuItemTranslations.menuItemId],
      references: [menuItems.id],
    }),
  })
);

export const tagsRelations = relations(tags, ({ many }) => ({
  menuItemTags: many(menuItemTags),
  translations: many(tagTranslations),
}));

export const tagTranslationsRelations = relations(
  tagTranslations,
  ({ one }) => ({
    tag: one(tags, {
      fields: [tagTranslations.tagId],
      references: [tags.id],
    }),
  })
);

export const menuItemTagsRelations = relations(menuItemTags, ({ one }) => ({
  menuItem: one(menuItems, {
    fields: [menuItemTags.menuItemId],
    references: [menuItems.id],
  }),
  tag: one(tags, {
    fields: [menuItemTags.tagId],
    references: [tags.id],
  }),
}));

// Zod schemas
export const insertCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);

export const insertMenuItemSchema = createInsertSchema(menuItems);
export const selectMenuItemSchema = createSelectSchema(menuItems);

export const insertTagSchema = createInsertSchema(tags);
export const selectTagSchema = createSelectSchema(tags);

export const insertMenuItemTagSchema = createInsertSchema(menuItemTags);
export const selectMenuItemTagSchema = createSelectSchema(menuItemTags);

export const insertCategoryTranslationSchema = createInsertSchema(categoryTranslations);
export const selectCategoryTranslationSchema = createSelectSchema(categoryTranslations);

export const insertMenuItemTranslationSchema = createInsertSchema(menuItemTranslations);
export const selectMenuItemTranslationSchema = createSelectSchema(menuItemTranslations);

export const insertTagTranslationSchema = createInsertSchema(tagTranslations);
export const selectTagTranslationSchema = createSelectSchema(tagTranslations);

