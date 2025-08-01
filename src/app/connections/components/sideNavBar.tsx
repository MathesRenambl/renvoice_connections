"use client";
import * as React from "react";
import { ChevronRight, LayoutDashboard, CreditCard, Plug, BadgeCheck } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { useAppContext } from "@/hooks/context";
import { useSession } from "next-auth/react";

// JSON data structure for navigation
const navigationData = {
  dashboard: {
    title: "Dashboard",
    href: "/connections/dashboard",
    icon: LayoutDashboard,
    type: "single"
  },
  licenseUsage: {
      title: "License Usage",
      href: "/connections/licenseUsage",
      icon: BadgeCheck,
      type: "single"
    },
  purchaseConnection: {
      title: "Purchase license",
      href: "/connections/purchaseConnections",
      icon: Plug,
      type: "single"
    },
    paymentHistory: {
      title: "Payment History", 
      href: "/connections/paymentHistory",
      icon: CreditCard,
      type: "single"
    },
};

export default function sideNavBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { userData } = useAppContext();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  // Convert JSON data to array format
  function convertNavDataToArray(navData: Record<string, any>): any[] {
    return Object.entries(navData).map(([key, item]) => ({
      ...item,
      key
    }));
  }

  const navGroups = convertNavDataToArray(navigationData);

  return (
    <Sidebar 
      className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...props}
    >
      <SidebarContent
        className={`gap-1 px-2 py-4 ${!isMobile ? "mt-[60px]" : ""} scrollbar-hide`}
      >
        {navGroups.map((item) => {
          // Check if current path matches this item
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          // Render grouped menu (if you have groups in future)
          if (item.type === "group") {
            return (
              <Collapsible
                key={item.key}
                defaultOpen={false}
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sm md:text-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
                      <item.groupIcon className="!w-[20px] !h-[20px]" />
                      <div aria-label="sidebar group title">
                        {item.groupTitle}
                      </div>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent className="pt-3">
                      <SidebarMenu>
                        {item.items.map((child: any) => {
                          const isChildActive = pathname === child.href || pathname.startsWith(child.href + '/');
                          return (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton asChild isActive={isChildActive}>
                                <Link
                                  href={child.href}
                                  className="flex items-center gap-2 font-semibold ml-3"
                                >
                                  <child.icon className="!w-[18px] !h-[18px]" />
                                  {child.title}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          }

          // Render ungrouped top-level menu
          return (
            <SidebarGroup key={item.key}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 font-semibold transition-colors"
                      >
                        <item.icon className="!w-[20px] !h-[20px]" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}