import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function NotFound() {
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
          <div className="p-3 bg-muted rounded-full">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Product Not Found
            </h2>
            <p className="text-muted-foreground">
              The product you&apos;re looking for doesn&apos;t exist or may have been removed from our menu.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild>
              <Link href="/menu" className="flex items-center gap-2">
                Browse Menu
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}