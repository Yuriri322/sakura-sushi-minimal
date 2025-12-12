import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-card rounded-lg animate-pulse mb-4 max-w-md mx-auto" />
        <div className="h-6 bg-card rounded-lg animate-pulse max-w-2xl mx-auto" />
      </div>

      {/* Featured section skeleton */}
      <section className="py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="h-10 bg-card rounded-lg animate-pulse mb-4 max-w-sm mx-auto" />
          <div className="h-6 bg-card rounded-lg animate-pulse max-w-xl mx-auto" />
        </div>

        {/* Featured items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-8 w-8 bg-muted rounded" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="h-10 bg-card rounded-lg animate-pulse w-40 mx-auto" />
        </div>
      </section>

      {/* Promo banner skeleton */}
      <section className="py-12 bg-primary/10 border-y border-border/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 bg-card rounded-lg animate-pulse mb-2 max-w-sm mx-auto" />
          <div className="h-5 bg-card rounded-lg animate-pulse max-w-md mx-auto" />
        </div>
      </section>
    </div>
  );
}