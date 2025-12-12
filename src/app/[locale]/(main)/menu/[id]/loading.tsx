import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-card rounded animate-pulse w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product image skeleton */}
        <div className="aspect-square bg-card rounded-lg animate-pulse" />

        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Category badge */}
          <div className="h-6 bg-card rounded animate-pulse w-20" />

          {/* Title and price */}
          <div className="space-y-4">
            <div className="h-10 bg-card rounded animate-pulse w-3/4" />
            <div className="h-8 bg-card rounded animate-pulse w-24" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-5 bg-card rounded animate-pulse w-full" />
            <div className="h-5 bg-card rounded animate-pulse w-5/6" />
            <div className="h-5 bg-card rounded animate-pulse w-3/4" />
          </div>

          {/* Separator */}
          <div className="h-px bg-border" />

          {/* Quantity and buttons */}
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-card rounded animate-pulse w-16 mb-2" />
              <div className="flex items-center gap-4">
                <div className="h-10 bg-card rounded animate-pulse w-32" />
                <div className="h-6 bg-card rounded animate-pulse w-24" />
              </div>
            </div>
            <div className="h-12 bg-card rounded animate-pulse w-40" />
          </div>

          {/* Additional info card */}
          <Card className="p-6">
            <div className="h-6 bg-card rounded animate-pulse w-40 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-muted rounded animate-pulse w-20" />
                  <div className="h-4 bg-muted rounded animate-pulse w-24" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}