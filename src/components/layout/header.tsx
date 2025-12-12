"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/10 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="text-xl sm:text-2xl font-bold text-primary">🌸</div>
              <span className="text-base sm:text-xl font-bold text-foreground">
                <span className="hidden xs:inline">Sakura Sushi</span>
                <span className="xs:hidden">Sakura</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Left aligned after logo */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-8 lg:ml-12">
            <Link
              href="/menu"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('menu')}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            <LanguageSwitcher />

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[260px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col space-y-1 mt-8">
                  <Link
                    href="/menu"
                    className="text-lg font-medium text-foreground hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('menu')}
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-foreground hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('about')}
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-foreground hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}