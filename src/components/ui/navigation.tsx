"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, LayoutGrid, BarChart3, Settings, Home } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn("flex space-x-4 lg:space-x-6", className)}>
      <NavItem href="/dashboard" icon={<Home className="mr-2 h-4 w-4" />}>
        Home
      </NavItem>
      <NavItem href="/agents" icon={<Phone className="mr-2 h-4 w-4" />}>
        Agents
      </NavItem>
      <NavItem href="/workflow" icon={<LayoutGrid className="mr-2 h-4 w-4" />}>
        Workflow
      </NavItem>
      <NavItem href="/analytics" icon={<BarChart3 className="mr-2 h-4 w-4" />}>
        Analytics
      </NavItem>
      {/* <NavItem href="/settings" icon={<Settings className="mr-2 h-4 w-4" />}>
        Settings
      </NavItem> */}
    </nav>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function NavItem({ href, children, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {icon}
      {children}
    </Link>
  );
}
