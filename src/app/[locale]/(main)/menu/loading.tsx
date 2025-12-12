
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 bg-card rounded-lg animate-pulse mb-4 max-w-sm mx-auto" />
        <div className="h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
      </div>

      {/* Category filter skeleton */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-card rounded-lg animate-pulse w-24" />
        ))}
      </div>

      {/* Menu items grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-muted rounded w-16" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-muted rounded" />
                  <div className="h-8 w-8 bg-muted rounded" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}