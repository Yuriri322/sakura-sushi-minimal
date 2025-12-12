import { getMenuItemById, type Locale } from "@/lib/db/queries";
import { ProductDetail } from "../components/product-detail";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, locale } = await params;
  const product = await getMenuItemById(id, locale as Locale);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id, locale } = await params;
  const product = await getMenuItemById(id, locale as Locale);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Sakura Sushi`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Sakura Sushi`,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

// Disable static generation for now - we'll generate dynamically based on locale
// export async function generateStaticParams() {
//   // Would need to generate for all locales
//   return [];
// }

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour