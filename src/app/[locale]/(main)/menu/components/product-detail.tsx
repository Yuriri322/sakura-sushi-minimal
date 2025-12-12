import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ProductDetailClient } from "./product-detail-client";
import { BackToMenuButton } from "./back-to-menu-button";
import { TagBadge } from "@/components/ui/tag-badge";
import { getTranslations } from "next-intl/server";

interface Tag {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  category: string;
}

interface Product {
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
  createdAt: Date;
  updatedAt: Date;
  tags?: Tag[];
}

interface ProductDetailProps {
  product: Product;
}

export async function ProductDetail({ product }: ProductDetailProps) {
  const t = await getTranslations("menu");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <BackToMenuButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-card">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
              <div className="text-8xl">🐟</div>
            </div>
          )}

          {/* Availability Badge */}
          {!product.available && (
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 bg-destructive text-destructive-foreground"
            >
              {t("outOfStock")}
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          {product.category && (
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category.name}
              </Badge>
            </div>
          )}

          {/* Title and Price */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-primary">
                  {parseFloat(product.price).toFixed(2)} лв
                </span>
                {product.priceEur && (
                  <span className="text-xl text-muted-foreground">
                    {parseFloat(product.priceEur).toFixed(2)} €
                  </span>
                )}
              </div>
              {product.pieces && (
                <span className="text-lg text-muted-foreground">
                  {product.pieces} {t("pieces")}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t("tags")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <TagBadge
                    key={tag.id}
                    name={tag.name}
                    icon={tag.icon}
                    color={tag.color}
                    size="default"
                  />
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Quantity and Add to Cart - Client Component */}
          <ProductDetailClient product={product} />

          {/* Additional Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">
              {t("productInfo")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("freshness")}:</span>
                <span>{t("freshnessValue")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("storage")}:</span>
                <span>{t("storageValue")}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
