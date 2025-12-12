export function FeaturedMenuLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-lg border border-border/50 overflow-hidden animate-pulse"
        >
          <div className="aspect-[4/3] bg-muted" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-8 w-8 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}