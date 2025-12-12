import { config } from "dotenv";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import {
  categories,
  categoryTranslations,
  menuItems,
  menuItemTranslations,
  tags,
  tagTranslations,
  menuItemTags,
} from "../src/lib/db/schema";

config({ path: resolve(process.cwd(), ".env.dev") });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

// Supabase Storage base URL for menu images
const STORAGE_BASE_URL =
  "https://vatrxjtbwwlfhidnyoof.supabase.co/storage/v1/object/public/menu-images";

// Helper to get image URL from slug (default .jpeg, can override with imageExt)
const getImageUrl = (slug: string, ext: string = "jpeg"): string =>
  `${STORAGE_BASE_URL}/menu-items/${slug}.${ext}`;

// Helper to calculate EUR price from BGN (1 EUR = ~1.955 BGN)
const toEur = (bgn: string): string => (parseFloat(bgn) / 1.9558).toFixed(2);

// Type definitions
interface TagRef {
  id: string;
  slug: string;
}

interface MenuItemData {
  slug: string;
  nameBg: string;
  nameEn: string;
  price: string;
  descBg: string;
  descEn: string;
  tags: TagRef[];
  imageExt?: string; // optional image extension, defaults to "jpeg"
}

interface CreatedMenuItem extends MenuItemData {
  id: string;
}

// Helper function to create menu items for a category
async function createMenuItems(
  items: MenuItemData[],
  categoryId: string
): Promise<CreatedMenuItem[]> {
  const created: CreatedMenuItem[] = [];

  for (const item of items) {
    const [menuItem] = await db
      .insert(menuItems)
      .values({
        slug: item.slug,
        price: item.price,
        priceEur: toEur(item.price),
        imageUrl: getImageUrl(item.slug, item.imageExt || "jpeg"),
        categoryId,
        available: true,
      })
      .returning();
    created.push({ ...item, id: menuItem.id });
  }

  return created;
}

// Helper to create translations for menu items
function buildTranslations(items: CreatedMenuItem[]) {
  return items.flatMap((item) => [
    {
      menuItemId: item.id,
      locale: "bg",
      name: item.nameBg,
      description: item.descBg,
    },
    {
      menuItemId: item.id,
      locale: "en",
      name: item.nameEn,
      description: item.descEn,
    },
  ]);
}

// Helper to build tag associations
function buildTagAssociations(items: CreatedMenuItem[]) {
  return items.flatMap((item) =>
    item.tags.map((tag) => ({
      menuItemId: item.id,
      tagId: tag.id,
    }))
  );
}

async function seed() {
  console.log("🌱 Seeding full menu database...\n");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.execute(
      sql`TRUNCATE TABLE menu_item_tags, menu_item_translations, menu_items, tag_translations, tags, category_translations, categories RESTART IDENTITY CASCADE`
    );
    console.log("✓ Existing data cleared");

    // ============================================
    // CATEGORIES
    // ============================================
    console.log("\nCreating categories...");

    const categoryData = [
      {
        slug: "uramaki",
        nameBg: "УРАМАКИ",
        nameEn: "URAMAKI",
        descBg: "Обърнати ролки с ориз отвън",
        descEn: "Inside-out rolls with rice on the outside",
      },
      {
        slug: "gunkan",
        nameBg: "ГУНКАН",
        nameEn: "GUNKAN",
        descBg: "Суши тип бойни кораби",
        descEn: "Battleship-style sushi",
      },
      {
        slug: "hosomaki",
        nameBg: "ХОСОМАКИ",
        nameEn: "HOSOMAKI",
        descBg: "Тънки ролки с нори отвън",
        descEn: "Thin rolls with nori on the outside",
      },
      {
        slug: "hot-rolls",
        nameBg: "ТОПЛИ РОЛКИ",
        nameEn: "HOT ROLLS",
        descBg: "Топли запечени ролки",
        descEn: "Warm baked rolls",
      },
      {
        slug: "nigiri",
        nameBg: "НИГИРИ",
        nameEn: "NIGIRI",
        descBg: "Суши с риба върху оризов блок",
        descEn: "Fish on pressed rice",
      },
      {
        slug: "wok",
        nameBg: "УОК",
        nameEn: "WOK",
        descBg: "Азиатски ястия в уок тиган",
        descEn: "Asian stir-fry dishes",
      },
      {
        slug: "hot-bowls",
        nameBg: "ТОПЛИ БОУЛОВЕ",
        nameEn: "HOT BOWLS",
        descBg: "Топли японски боулове",
        descEn: "Hot Japanese bowls",
      },
      {
        slug: "soups",
        nameBg: "СУПИ",
        nameEn: "SOUPS",
        descBg: "Традиционни японски супи",
        descEn: "Traditional Japanese soups",
      },
      {
        slug: "hot-appetizers",
        nameBg: "ТОПЛИ ПРЕДЯСТИЯ",
        nameEn: "HOT APPETIZERS",
        descBg: "Топли японски предястия",
        descEn: "Hot Japanese starters",
      },
      {
        slug: "poke",
        nameBg: "ПОКЕ",
        nameEn: "POKE",
        descBg: "Хавайски боулове с риба",
        descEn: "Hawaiian fish bowls",
      },
    ];

    const createdCategories: Record<string, string> = {};

    for (const cat of categoryData) {
      const [created] = await db
        .insert(categories)
        .values({
          slug: cat.slug,
          imageUrl: `${STORAGE_BASE_URL}/categories/${cat.slug}.jpeg`,
        })
        .returning();

      createdCategories[cat.slug] = created.id;

      await db.insert(categoryTranslations).values([
        {
          categoryId: created.id,
          locale: "bg",
          name: cat.nameBg,
          description: cat.descBg,
        },
        {
          categoryId: created.id,
          locale: "en",
          name: cat.nameEn,
          description: cat.descEn,
        },
      ]);
    }

    console.log("✓ Categories created with translations");

    // ============================================
    // TAGS
    // ============================================
    console.log("\nCreating tags...");

    const tagData = [
      // Dietary
      {
        slug: "vegetarian",
        icon: "🥬",
        color: "#22c55e",
        category: "dietary" as const,
        nameBg: "Вегетарианско",
        nameEn: "Vegetarian",
      },
      {
        slug: "vegan",
        icon: "🌱",
        color: "#10b981",
        category: "dietary" as const,
        nameBg: "Веган",
        nameEn: "Vegan",
      },
      // Special
      {
        slug: "popular",
        icon: "⭐",
        color: "#f59e0b",
        category: "special" as const,
        nameBg: "Популярно",
        nameEn: "Popular",
      },
      // Spice
      {
        slug: "spicy",
        icon: "🌶️",
        color: "#ef4444",
        category: "spice" as const,
        nameBg: "Лютиво",
        nameEn: "Spicy",
      },
      // Allergens
      {
        slug: "fish",
        icon: "🐟",
        color: "#3b82f6",
        category: "allergen" as const,
        nameBg: "Риба",
        nameEn: "Fish",
      },
      {
        slug: "shellfish",
        icon: "🦐",
        color: "#ec4899",
        category: "allergen" as const,
        nameBg: "Морски дарове",
        nameEn: "Shellfish",
      },
      {
        slug: "dairy",
        icon: "🥛",
        color: "#a855f7",
        category: "allergen" as const,
        nameBg: "Млечни продукти",
        nameEn: "Dairy",
      },
      {
        slug: "soy",
        icon: "🫘",
        color: "#78350f",
        category: "allergen" as const,
        nameBg: "Соя",
        nameEn: "Soy",
      },
      {
        slug: "gluten",
        icon: "🌾",
        color: "#d97706",
        category: "allergen" as const,
        nameBg: "Глутен",
        nameEn: "Gluten",
      },
      {
        slug: "sesame",
        icon: "🫘",
        color: "#92400e",
        category: "allergen" as const,
        nameBg: "Сусам",
        nameEn: "Sesame",
      },
      {
        slug: "eggs",
        icon: "🥚",
        color: "#eab308",
        category: "allergen" as const,
        nameBg: "Яйца",
        nameEn: "Eggs",
      },
    ];

    const createdTags: Record<string, TagRef> = {};

    for (const tag of tagData) {
      const [created] = await db
        .insert(tags)
        .values({
          slug: tag.slug,
          icon: tag.icon,
          color: tag.color,
          category: tag.category,
        })
        .returning();

      createdTags[tag.slug] = { id: created.id, slug: tag.slug };

      await db.insert(tagTranslations).values([
        { tagId: created.id, locale: "bg", name: tag.nameBg },
        { tagId: created.id, locale: "en", name: tag.nameEn },
      ]);
    }

    console.log("✓ Tags created with translations");

    // Shorthand for tags
    const t = createdTags;

    // ============================================
    // MENU ITEMS
    // ============================================
    console.log("\nCreating menu items...");

    const allCreatedItems: CreatedMenuItem[] = [];

    // URAMAKI (14 items) - Popular items first, then rest alphabetically
    const uramakiItems: MenuItemData[] = [
      // Popular items first
      {
        slug: "philadelphi",
        nameBg: "ФИЛАДЕЛФИЯ",
        nameEn: "Philadelphia",
        price: "14.70",
        descBg: "Класически урамаки със сьомга, филаделфия сирене и краставица",
        descEn: "Classic uramaki with salmon, Philadelphia cheese and cucumber",
        tags: [t.popular, t.fish, t.dairy, t.soy, t.gluten],
      },
      {
        slug: "kaliforniy",
        nameBg: "КАЛИФОРНИЯ",
        nameEn: "California",
        price: "14.70",
        descBg: "Урамаки със сурими, авокадо, краставица и летящи хайверчета",
        descEn: "Uramaki with surimi, avocado, cucumber and flying fish roe",
        tags: [t.popular, t.shellfish, t.fish, t.soy, t.gluten],
      },
      {
        slug: "syomga_bu",
        nameBg: "СЬОМГА БУМ",
        nameEn: "Salmon Boom!",
        price: "15.70",
        descBg:
          "Урамаки със сьомга, филаделфия сирене, авокадо и летящи хайверчета",
        descEn:
          "Uramaki with salmon, Philadelphia cheese, avocado and flying fish roe",
        tags: [t.popular, t.fish, t.dairy, t.soy, t.gluten],
      },
      {
        slug: "banketyt_na_poseydo",
        nameBg: "БАНКЕТЪТ НА ПОСЕЙДОН",
        nameEn: "Poseidon Banquet",
        price: "13.70",
        descBg:
          "Урамаки с кралски скариди, авокадо, краставица и крем сирене, поръсен със сусам",
        descEn:
          "Uramaki with king prawns, avocado, cucumber and cream cheese, sprinkled with sesame",
        tags: [t.popular, t.shellfish, t.dairy, t.soy, t.gluten, t.sesame],
      },
      {
        slug: "izgryavashto_slync",
        nameBg: "ИЗГРЯВАЩО СЛЪНЦЕ",
        nameEn: "Rising Sun",
        price: "11.70",
        descBg: "Урамаки с пушена сьомга, крем сирене и сусам",
        descEn: "Uramaki with smoked salmon, cream cheese and sesame",
        tags: [t.popular, t.fish, t.dairy, t.soy, t.gluten, t.sesame],
      },
      // Rest of items
      {
        slug: "albino",
        nameBg: "АЛБИНОС",
        nameEn: "Albinos",
        price: "13.70",
        descBg: "Урамаки със скариди, краставица и спайси майонеза",
        descEn: "Uramaki with shrimp, cucumber and spicy mayo",
        tags: [t.shellfish, t.soy, t.gluten, t.eggs],
      },
      {
        slug: "zlatan_zmio",
        nameBg: "ЗЛАТНА ЗМИОРКА",
        nameEn: "Golden Eel",
        price: "17.70",
        descBg:
          "Пушена змиорка, краставица, манго, кафяв захар, суши ориз, нори",
        descEn: "Smoked eel, cucumber, mango, brown sugar, sushi rice, nori",
        tags: [t.fish, t.soy, t.gluten, t.sesame],
      },
      {
        slug: "izumrudna_skarid",
        nameBg: "ИЗУМРУДНА СКАРИДИ",
        nameEn: "Emerald Shrimp",
        price: "13.70",
        descBg: "Урамаки със скариди, авокадо, краставица и крем сирене",
        descEn: "Uramaki with shrimp, avocado, cucumber and cream cheese",
        tags: [t.shellfish, t.dairy, t.soy, t.gluten],
      },
      {
        slug: "miyadzak",
        nameBg: "МИЯДЗАКИ",
        nameEn: "Miyazaki",
        price: "13.70",
        descBg: "Урамаки със змиор, краставица, авокадо и унаги сос",
        descEn: "Uramaki with eel, cucumber, avocado and unagi sauce",
        tags: [t.fish, t.soy, t.gluten, t.sesame],
      },
      {
        slug: "nefritov_drako",
        nameBg: "НЕФРИТОВ ДРАКОН",
        nameEn: "Jade Dragon",
        price: "14.70",
        descBg:
          "Урамаки с темпура скариди, авокадо, краставица и спайси майонеза",
        descEn: "Uramaki with tempura shrimp, avocado, cucumber and spicy mayo",
        tags: [t.shellfish, t.soy, t.gluten, t.eggs],
      },
      {
        slug: "neshtastniyat_riba",
        nameBg: "НЕЩАСТНИЯТ РИБАР",
        nameEn: "The Unfortunate Fisherman",
        price: "13.70",
        descBg: "Урамаки със сьомга, авокадо и унаги сос",
        descEn: "Uramaki with salmon, avocado and unagi sauce",
        tags: [t.fish, t.soy, t.gluten, t.sesame],
      },
      {
        slug: "tantsuvasha_ryba_to",
        nameBg: "ТАНЦУВАЩ РИБА ТОН",
        nameEn: "Dancing Tuna",
        price: "13.70",
        descBg: "Урамаки с риба тон, авокадо, спайси майонеза и чесън",
        descEn: "Uramaki with tuna, avocado, spicy mayo and garlic",
        tags: [t.spicy, t.fish, t.soy, t.gluten, t.eggs],
      },
      {
        slug: "fudziyam",
        nameBg: "ФУДЖИЯМА",
        nameEn: "Fujiyama",
        price: "11.70",
        descBg: "Урамаки с печени зеленчуци, крем сирене и сусам",
        descEn: "Uramaki with grilled vegetables, cream cheese and sesame",
        tags: [t.vegetarian, t.dairy, t.soy, t.gluten, t.sesame],
      },
      {
        slug: "vegan_ro",
        nameBg: "ВЕГАН РОЛ",
        nameEn: "Vegan Roll",
        price: "11.70",
        descBg: "Урамаки с авокадо, краставица, моркови и сусам",
        descEn: "Uramaki with avocado, cucumber, carrots and sesame",
        tags: [t.vegetarian, t.vegan, t.soy, t.gluten, t.sesame],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(uramakiItems, createdCategories["uramaki"]))
    );

    // GUNKAN (3 items) - slugs match actual image filenames
    const gunkanItems: MenuItemData[] = [
      {
        slug: "syoumga_gunka", // correct filename
        nameBg: "СЬОМГА",
        nameEn: "Gunkan with Salmon",
        price: "3.30",
        descBg: "Гункан със сьомга и майонеза (1 бр)",
        descEn: "Gunkan with salmon and mayo (1 pc)",
        tags: [t.fish, t.soy, t.gluten, t.eggs],
      },
      {
        slug: "cipura_gunka",
        nameBg: "ЦИПУРА",
        nameEn: "Gunkan with Sea Bream",
        price: "3.30",
        descBg: "Гункан с ципура и майонеза (1 бр)",
        descEn: "Gunkan with sea bream and mayo (1 pc)",
        tags: [t.fish, t.soy, t.gluten, t.eggs],
      },
      {
        slug: "ryba_ton_gunka",
        nameBg: "ТОН",
        nameEn: "Gunkan with Tuna",
        price: "3.30",
        descBg: "Гункан с риба тон и майонеза (1 бр)",
        descEn: "Gunkan with tuna and mayo (1 pc)",
        tags: [t.fish, t.soy, t.gluten, t.eggs],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(gunkanItems, createdCategories["gunkan"]))
    );

    // HOSOMAKI (4 items) - slugs match actual image filenames
    const hosomakiItems: MenuItemData[] = [
      {
        slug: "sis_avocado_hosomak", // truncated filename in storage
        nameBg: "СЪС АВОКАДО",
        nameEn: "Hosomaki with Avocado",
        price: "5.70",
        descBg: "Тънки ролки с авокадо и сусам (6 броя)",
        descEn: "Thin rolls with avocado and sesame (6 pcs)",
        tags: [t.vegetarian, t.vegan, t.soy, t.gluten, t.sesame],
      },
      {
        slug: "sis_syomga_hosomak", // truncated filename in storage
        nameBg: "СЪС СЬОМГА",
        nameEn: "Hosomaki with Salmon",
        price: "7.70",
        descBg: "Тънки ролки със сьомга (6 броя)",
        descEn: "Thin rolls with salmon (6 pcs)",
        tags: [t.fish, t.soy, t.gluten],
      },
      {
        slug: "sis_krastavitsa",
        nameBg: "СЪС КРАСТАВИЦА",
        nameEn: "Hosomaki with Cucumber",
        price: "6.70",
        descBg: "Краставица, суши ориз, нори (8 броя)",
        descEn: "Cucumber, sushi rice, nori (8 pcs)",
        tags: [t.vegetarian, t.vegan, t.soy, t.gluten],
        imageExt: "png",
      },
      {
        slug: "sis_ryba_ton",
        nameBg: "СЪС РИБА ТОН",
        nameEn: "Hosomaki with Tuna",
        price: "8.70",
        descBg: "Риба тон, суши ориз, нори (8 броя)",
        descEn: "Tuna, sushi rice, nori (8 pcs)",
        tags: [t.fish, t.soy, t.gluten],
        imageExt: "png",
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(hosomakiItems, createdCategories["hosomaki"]))
    );

    // HOT ROLLS (4 items) - Popular items first
    const hotRollsItems: MenuItemData[] = [
      {
        slug: "legloto_na_rusalkat",
        nameBg: "ЛЕГЛОТО НА РУСАЛКАТА",
        nameEn: "Mermaid's Bed",
        price: "14.70",
        descBg: "Топъл рол със сьомга, крем сирене и унаги сос",
        descEn: "Hot roll with salmon, cream cheese and unagi sauce",
        tags: [t.popular, t.fish, t.dairy, t.soy, t.gluten],
      },
      {
        slug: "skaridiniyat_kra",
        nameBg: "СКАРИДЕНИЯТ КРАЛ",
        nameEn: "The Shrimp King",
        price: "16.70",
        descBg: "Тартар скарида, жълтък, унаги сос, темпура, суши ориз, нори",
        descEn:
          "Shrimp tartare, egg yolk, unagi sauce, tempura, sushi rice, nori",
        tags: [t.shellfish, t.eggs, t.soy, t.gluten],
      },
      {
        slug: "sator",
        nameBg: "САТОРУ",
        nameEn: "Satoru",
        price: "14.70",
        descBg: "Топъл рол с риба тон, авокадо и спайси майонеза",
        descEn: "Hot roll with tuna, avocado and spicy mayo",
        tags: [t.spicy, t.fish, t.soy, t.gluten, t.eggs],
      },
      {
        slug: "chetyre_siren",
        nameBg: "ТРИ СИРА",
        nameEn: "Four Cheeses",
        price: "13.70",
        descBg: "Топъл рол с крем сирене, моцарела и пармезан",
        descEn: "Hot roll with cream cheese, mozzarella and parmesan",
        tags: [t.vegetarian, t.dairy, t.soy, t.gluten],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(hotRollsItems, createdCategories["hot-rolls"]))
    );

    // NIGIRI (9 items) - Popular items first, slugs match actual image filenames
    const nigiriItems: MenuItemData[] = [
      {
        slug: "syomga_nigir", // correct filename
        nameBg: "СЬОМГА",
        nameEn: "Salmon",
        price: "2.30",
        descBg: "Нигири с пресна сьомга (1 бр)",
        descEn: "Nigiri with fresh salmon (1 pc)",
        tags: [t.popular, t.fish, t.soy, t.gluten],
      },
      {
        slug: "niigiri_zmio",
        nameBg: "ЗМИОРКА",
        nameEn: "Eel",
        price: "4.30",
        descBg: "Пушена змиорка, суши ориз, уасаби, нори (1 бр)",
        descEn: "Smoked eel, sushi rice, wasabi, nori (1 pc)",
        tags: [t.fish, t.soy, t.gluten],
      },
      {
        slug: "zapechena_syomg",
        nameBg: "ЗАПЕЧЕНА СЬОМГА",
        nameEn: "Baked Salmon",
        price: "2.30",
        descBg: "Нигири със запечена сьомга (1 бр)",
        descEn: "Nigiri with baked salmon (1 pc)",
        tags: [t.fish, t.soy, t.gluten],
      },
      {
        slug: "skarida_nigir",
        nameBg: "СКАРИДИ",
        nameEn: "Shrimp",
        price: "2.30",
        descBg: "Нигири със скариди (1 бр)",
        descEn: "Nigiri with shrimp (1 pc)",
        tags: [t.shellfish, t.soy, t.gluten],
      },
      {
        slug: "cipura_nigir",
        nameBg: "ЦИПУРА",
        nameEn: "Sea Bream",
        price: "3.70",
        descBg: "Нигири с ципура (1 бр)",
        descEn: "Nigiri with sea bream (1 pc)",
        tags: [t.fish, t.soy, t.gluten],
      },
      {
        slug: "niigiri_omle",
        nameBg: "ОМЛЕТ",
        nameEn: "Omelette",
        price: "2.30",
        descBg: 'Суши ориз, нори, бульон "даши", яйца (1 бр)',
        descEn: "Sushi rice, nori, dashi broth, eggs (1 pc)",
        tags: [t.vegetarian, t.eggs, t.soy, t.gluten],
      },
      {
        slug: "niigiri_syomg",
        nameBg: "СЬОМГА НИГИРИ",
        nameEn: "Smoked Salmon",
        price: "3.70",
        descBg: "Сурова сьомга, суши ориз, уасаби (1 бр)",
        descEn: "Raw salmon, sushi rice, wasabi (1 pc)",
        tags: [t.fish, t.soy, t.gluten],
      },
      {
        slug: "kralski_omlet_nigir",
        nameBg: "ЦАРСКИ ОМЛЕТ",
        nameEn: "Royal Omelet",
        price: "1.70",
        descBg: "Нигири с обогатен японски омлет (1 бр)",
        descEn: "Nigiri with enriched Japanese omelette (1 pc)",
        tags: [t.vegetarian, t.eggs, t.soy, t.gluten],
      },
      {
        slug: "ryba_ton_nigir",
        nameBg: "РИБА ТОН",
        nameEn: "Tuna Fish",
        price: "2.30",
        descBg: "Нигири с риба тон (1 бр)",
        descEn: "Nigiri with tuna (1 pc)",
        tags: [t.fish, t.soy, t.gluten],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(nigiriItems, createdCategories["nigiri"]))
    );

    // WOK (3 items)
    const wokItems: MenuItemData[] = [
      {
        slug: "svinski_wo",
        nameBg: "СВИНСКО",
        nameEn: "Pork Wok",
        price: "10.70",
        descBg: "Уок нудли със свинско месо и зеленчуци",
        descEn: "Wok noodles with pork and vegetables",
        tags: [t.soy, t.gluten, t.sesame],
      },
      {
        slug: "pilehski_wo",
        nameBg: "ПИЛЕШКИ УОК",
        nameEn: "Chicken Wok",
        price: "13.70",
        descBg:
          "Пилешко месо, нудли удон, морков, лук, зелен лук, якинику сос, сусам, корейски пипер",
        descEn:
          "Chicken, udon noodles, carrot, onion, green onion, yakiniku sauce, sesame, Korean pepper",
        tags: [t.soy, t.gluten, t.sesame],
      },
      {
        slug: "morski_darove_wo",
        nameBg: "МОРСКИ ДАРОВЕ",
        nameEn: "Seafood Wok",
        price: "13.70",
        descBg: "Уок нудли с микс морски дарове и зеленчуци",
        descEn: "Wok noodles with mixed seafood and vegetables",
        tags: [t.shellfish, t.fish, t.soy, t.gluten, t.sesame],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(wokItems, createdCategories["wok"]))
    );

    // HOT BOWLS (3 items)
    const hotBowlsItems: MenuItemData[] = [
      {
        slug: "tonkat",
        nameBg: "ТОНКАЦ",
        nameEn: "Tonkac",
        price: "11.70",
        descBg: "Японски боул с панирано свинско месо, ориз и зеленчуци",
        descEn: "Japanese bowl with breaded pork, rice and vegetables",
        tags: [t.gluten, t.eggs, t.soy],
      },
      {
        slug: "shogoyak",
        nameBg: "ШОГОЯКИ",
        nameEn: "Shogoyaki",
        price: "11.70",
        descBg: "Японски боул с пилешко в соев сос, ориз и зеленчуци",
        descEn: "Japanese bowl with chicken in soy sauce, rice and vegetables",
        tags: [t.soy, t.gluten],
      },
      {
        slug: "karage_pileshk",
        nameBg: "КАРАГЕ ПИЛЕШКО",
        nameEn: "Karage Chicken",
        price: "10.70",
        descBg: "Японски боул с панирано пилешко, ориз и зеленчуци",
        descEn: "Japanese bowl with fried chicken, rice and vegetables",
        tags: [t.gluten, t.eggs, t.soy],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(hotBowlsItems, createdCategories["hot-bowls"]))
    );

    // SOUPS (3 items)
    const soupsItems: MenuItemData[] = [
      {
        slug: "miso_tof",
        nameBg: "МИСО ТОФУ",
        nameEn: "Miso Tofu Soup",
        price: "3.70",
        descBg: "Традиционна мисо супа с тофу, водорасли и зелен лук",
        descEn: "Traditional miso soup with tofu, seaweed and spring onions",
        tags: [t.vegetarian, t.vegan, t.soy],
      },
      {
        slug: "miso_svinsk",
        nameBg: "МИСО СВИНСКО",
        nameEn: "Miso Soup with Pork",
        price: "4.70",
        descBg: "Мисо супа със свинско месо, тофу и водорасли",
        descEn: "Miso soup with pork, tofu and seaweed",
        tags: [t.soy],
      },
      {
        slug: "miso_vega",
        nameBg: "МИСО ВЕГАН",
        nameEn: "Vegan Miso Soup",
        price: "3.70",
        descBg: "Веган мисо супа с водорасли и зелен лук",
        descEn: "Vegan miso soup with seaweed and spring onions",
        tags: [t.vegetarian, t.vegan, t.soy],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(soupsItems, createdCategories["soups"]))
    );

    // HOT APPETIZERS (3 items)
    const hotAppetizersItems: MenuItemData[] = [
      {
        slug: "hapki_ryba_to",
        nameBg: "ХАПКИ РИБА ТОН",
        nameEn: "Tuna Bites",
        price: "11.70",
        descBg: "Панирани хапки от риба тон с пикантен сос",
        descEn: "Breaded tuna bites with spicy sauce",
        tags: [t.fish, t.gluten, t.eggs, t.soy],
      },
      {
        slug: "karage_pileshki_hapk",
        nameBg: "ПИЛЕШКО КАРАГЕ",
        nameEn: "Nuggets Chicken Karage",
        price: "9.70",
        descBg: "Японски панирани пилешки хапки",
        descEn: "Japanese fried chicken bites",
        tags: [t.gluten, t.eggs, t.soy],
      },
      {
        slug: "motsarela_hapk",
        nameBg: "МОЦАРЕЛА ХАПКИ",
        nameEn: "Mozzarella Sticks",
        price: "7.70",
        descBg: "Панирани хапки моцарела със сладък чили сос",
        descEn: "Breaded mozzarella bites with sweet chili sauce",
        tags: [t.vegetarian, t.dairy, t.gluten, t.eggs],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(
        hotAppetizersItems,
        createdCategories["hot-appetizers"]
      ))
    );

    // POKE (3 items) - slugs match actual image filenames
    const pokeItems: MenuItemData[] = [
      {
        slug: "poke_to",
        nameBg: "ТОН",
        nameEn: "Poke Tuna Fish",
        price: "14.70",
        descBg:
          "Хавайски поке боул с риба тон, ориз, авокадо, едамаме и соев сос",
        descEn:
          "Hawaiian poke bowl with tuna, rice, avocado, edamame and soy sauce",
        tags: [t.popular, t.fish, t.soy, t.sesame],
      },
      {
        slug: "poke_syomg",
        nameBg: "СЬОМГА",
        nameEn: "Poke Salmon",
        price: "14.70",
        descBg:
          "Хавайски поке боул със сьомга, ориз, авокадо, едамаме и соев сос",
        descEn:
          "Hawaiian poke bowl with salmon, rice, avocado, edamame and soy sauce",
        tags: [t.popular, t.fish, t.soy, t.sesame],
      },
      {
        slug: "poke_zelenchuts",
        nameBg: "ЗЕЛЕНЧУЦИ",
        nameEn: "Poke Tofu",
        price: "10.70",
        descBg: "Веган поке боул с тофу, ориз, авокадо, едамаме и соев сос",
        descEn:
          "Vegan poke bowl with tofu, rice, avocado, edamame and soy sauce",
        tags: [t.vegetarian, t.vegan, t.soy, t.sesame],
      },
    ];
    allCreatedItems.push(
      ...(await createMenuItems(pokeItems, createdCategories["poke"]))
    );

    console.log("✓ Menu items created");

    // ============================================
    // TRANSLATIONS & TAG ASSOCIATIONS
    // ============================================
    console.log("Creating menu item translations...");
    const translations = buildTranslations(allCreatedItems);
    await db.insert(menuItemTranslations).values(translations);
    console.log("✓ Menu item translations created");

    console.log("Creating menu item tags...");
    const tagAssociations = buildTagAssociations(allCreatedItems);
    if (tagAssociations.length > 0) {
      await db.insert(menuItemTags).values(tagAssociations);
    }
    console.log("✓ Menu item tags created");

    // ============================================
    // SUMMARY
    // ============================================
    console.log("\n✅ Database seeded successfully!");
    console.log("\n📝 Summary:");
    console.log(`  - ${categoryData.length} categories`);
    console.log(`  - ${allCreatedItems.length} menu items`);
    console.log(`  - ${tagData.length} tags`);
    console.log(`  - Tags: Vegetarian, Vegan, Popular, Spicy`);
    console.log(
      `  - Allergens: Fish, Shellfish, Dairy, Soy, Gluten, Sesame, Eggs`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
