"use client";

import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    available: boolean;
    price: string;
    priceEur: string | null;
    imageUrl: string | null;
  };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations("menu");

  const handleCallToOrder = () => {
    window.location.href = "tel:0876795204";
  };

  const handleEmailOrder = () => {
    const subject = encodeURIComponent(`Order: ${product.name}`);
    const body = encodeURIComponent(
      `I would like to order ${product.name}.\n\nPlease contact me to confirm my order.\n\nThank you!`
    );
    window.location.href = `mailto:info@sakurasushi.bg?subject=${subject}&body=${body}`;
  };

  if (!product.available) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive font-medium">{t("outOfStock")}</p>
        </div>
        <Button size="lg" disabled className="w-full sm:w-auto px-8">
          {t("outOfStock")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">{t("price")}:</span>
            <span className="text-2xl font-bold text-primary">
              {parseFloat(product.price).toFixed(2)} лв
            </span>
          </div>
          {product.priceEur && (
            <span className="text-lg text-muted-foreground">
              {parseFloat(product.priceEur).toFixed(2)} €
            </span>
          )}
        </div>
      </div>

      {/* Order Instructions */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground mb-3">
          {t("callOrEmailToOrder")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={handleCallToOrder} className="flex-1">
            <Phone className="h-5 w-5 mr-2" />
            {t("callToOrder")}
          </Button>
          <Button
            size="lg"
            onClick={handleEmailOrder}
            variant="outline"
            className="flex-1"
          >
            <Mail className="h-5 w-5 mr-2" />
            {t("emailOrder")}
          </Button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-sm text-muted-foreground text-center">
        <p>📞 087 679 5204</p>
        <p>✉️ info@sakurasushi.bg</p>
      </div>
    </div>
  );
}
