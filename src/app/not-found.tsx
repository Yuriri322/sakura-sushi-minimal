import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg text-center p-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Large 404 with fish emoji */}
          <div className="text-center">
            <div className="text-8xl font-bold text-muted-foreground mb-2">404</div>
            <div className="text-4xl mb-4">🐟</div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Page Not Found
            </h1>
            <p className="text-muted-foreground">
              Looks like this fish swam away! The page you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
            <Button asChild className="flex-1">
              <Link href="/bg" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/bg/menu" className="flex items-center justify-center gap-2">
                <Search className="h-4 w-4" />
                Browse Menu
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}