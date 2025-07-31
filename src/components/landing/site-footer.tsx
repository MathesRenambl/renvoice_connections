"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold">Renvoice AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Build and deploy AI agents powered by telephonic interactions and advanced agentic workflows.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#examples" className="text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Renvoice AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
