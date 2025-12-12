"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  const isNotFound = error.message.includes("NEXT_NOT_FOUND") || error.digest?.includes("NOTFOUND");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link href="/menu" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>
        </Button>
      </div>

      <Card className="max-w-lg mx-auto text-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-destructive/10 rounded-full">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              {isNotFound ? "Product not found" : "Failed to load product"}
            </h2>
            <p className="text-muted-foreground">
              {isNotFound 
                ? "The product you're looking for doesn't exist or may have been removed."
                : "We couldn't load the product details. Please try again."
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {!isNotFound && (
              <Button onClick={reset} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/menu" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Browse Menu
              </Link>
            </Button>
          </div>
          
          {process.env.NODE_ENV === "development" && (
            <details className="text-left w-full pt-4">
              <summary className="text-sm text-muted-foreground cursor-pointer">
                Error details (dev only)
              </summary>
              <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </Card>
    </div>
  );
}