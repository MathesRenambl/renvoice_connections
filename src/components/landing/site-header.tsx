"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <Link href="/" className="text-xl font-bold">
  Renvoice AI
</Link>

        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#features" className="transition-colors hover:text-foreground/80">
            Features
          </Link>
          <Link href="/#examples" className="transition-colors hover:text-foreground/80">
            Examples
          </Link>
          <Link href="/#pricing" className="transition-colors hover:text-foreground/80">
            Pricing
          </Link>
          <Link href="/docs" className="transition-colors hover:text-foreground/80">
            Documentation
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
