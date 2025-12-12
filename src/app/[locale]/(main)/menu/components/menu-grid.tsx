import { MenuItemCard } from "./menu-item-card";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: string;
  priceEur: string | null;
  pieces: number | null;
  imageUrl: string | null;
  available: boolean;
  category: {
    id: string;
    name: string;
  } | null;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    color: string | null;
    category: string;
  }>;
}

interface MenuGridProps {
  menuItems: MenuItem[];
  pageKey?: string;
}

export function MenuGrid({ menuItems }: MenuGridProps) {
  if (menuItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐟</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No items found
        </h3>
        <p className="text-muted-foreground">
          Try selecting a different category or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
