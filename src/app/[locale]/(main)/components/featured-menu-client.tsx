"use client";

import { useState, useEffect } from "react";
import { FeaturedMenu } from "./featured-menu";
import { FeaturedMenuLoading } from "./featured-menu-loading";

interface FeaturedItem {
  id: string;
  name: string;
  description: string | null;
  price: string;
  priceEur: string | null;
  imageUrl: string | null;
  available: boolean;
  category: {
    id: string;
    name: string;
  } | null;
}

interface FeaturedMenuClientProps {
  featuredItems: FeaturedItem[];
}

export function FeaturedMenuClient({ featuredItems }: FeaturedMenuClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <FeaturedMenuLoading />;
  }

  return <FeaturedMenu featuredItems={featuredItems} />;
}