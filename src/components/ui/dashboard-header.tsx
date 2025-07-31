"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Menu, X, ChevronDown, Settings, LogOut, User, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Determine the current section based on the pathname
  let title = "Dashboard";
  if (pathname?.startsWith('/agents')) {
    title = "Agents";
  } else if (pathname?.startsWith('/workflow')) {
    title = "Workflow";
  } else if (pathname?.startsWith('/analytics')) {
    title = "Analytics";
  } else if (pathname?.startsWith('/settings')) {
    title = "Settings";
  } else if (pathname?.startsWith('/phone')) {
    title = "Phone";
  } else if (pathname?.startsWith('/integrations')) {
    title = "Integrations";
  } else if (pathname?.startsWith('/knowledge-base')) {
    title = "Knowledge Base";
  } else if (pathname?.startsWith('/call-history')) {
    title = "Call History";
  }

  // Mock notifications
  const notifications = [
    { id: 1, title: "New call received", time: "5 minutes ago", read: false },
    { id: 2, title: "Agent workflow updated", time: "1 hour ago", read: false },
    { id: 3, title: "System maintenance scheduled", time: "Yesterday", read: true },
  ];

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <MobileNavItem href="/dashboard" active={pathname === '/dashboard'}>Dashboard</MobileNavItem>
                <MobileNavItem href="/agents" active={pathname?.startsWith('/agents')}>Agents</MobileNavItem>
                <MobileNavItem href="/workflow" active={pathname?.startsWith('/workflow')}>Workflow</MobileNavItem>
                <MobileNavItem href="/phone" active={pathname?.startsWith('/phone')}>Phone</MobileNavItem>
                <MobileNavItem href="/integrations" active={pathname?.startsWith('/integrations')}>Integrations</MobileNavItem>
                <MobileNavItem href="/knowledge-base" active={pathname?.startsWith('/knowledge-base')}>Knowledge Base</MobileNavItem>
                <MobileNavItem href="/analytics" active={pathname?.startsWith('/analytics')}>Analytics</MobileNavItem>
                <MobileNavItem href="/call-history" active={pathname?.startsWith('/call-history')}>Call History</MobileNavItem>
                <MobileNavItem href="/settings" active={pathname?.startsWith('/settings')}>Settings</MobileNavItem>
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-xl font-semibold">{title}</h1>
          
          {title === "Workflow" && (
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Version 1.0
              </Badge>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Save
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Publish
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 md:w-[200px] lg:w-[300px] h-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-normal">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-pointer">
                  <div className="flex w-full justify-between">
                    <span className={`font-medium ${notification.read ? 'text-muted-foreground' : ''}`}>
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center" asChild>
                <Link href="/notifications">View all notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 pl-1">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src="/avatars/user.png" alt="User" /> */}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex">John Doe</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function MobileNavItem({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 text-sm ${
        active ? "bg-muted font-medium" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
