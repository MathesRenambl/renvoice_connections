"use client";
import * as React from "react";
import { ChevronRight } from "lucide-react";
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

import {
  navGroupsByRole,
  NavGroupItems,
  NavGroup,
  NavItem,
} from "@/data/sidebarLink"; // adjust the path as needed
import Link from "next/link";
import { useAppContext } from "@/hooks/context";
import { useSession } from "next-auth/react";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { userData } = useAppContext();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  // function filterNavByAccess(
  //   navData: (NavItem | NavGroup)[],
  //   pageAccess: string[]
  // ): (NavItem | NavGroup)[] {
  //   return navData
  //     .map((item) => {
  //       if ("groupTitle" in item) {
  //         const filteredItems = item.items.filter((navItem) =>
  //           pageAccess.includes(navItem.href.slice(1))
  //         );

  //         if (filteredItems.length > 0) {
  //           return {
  //             ...item,
  //             items: filteredItems,
  //           };
  //         }
  //         return null; // Exclude group if no items are accessible
  //       } else {
  //         return pageAccess.some((access) =>
  //           item.href.slice(1).startsWith(access)
  //         )
  //           ? item
  //           : null;
  //       }
  //     })
  //     .filter(Boolean) as (NavItem | NavGroup)[];
  // }

  function filterNavByAccess(
  navData: (NavItem | NavGroup)[],
  pageAccess: string[]
): (NavItem | NavGroup)[] {
  return navData
    .map(item => {
      if ("groupTitle" in item) {
        const filteredItems = item.items.filter(navItem =>
          pageAccess.some(access => navItem.href.slice(1).startsWith(access))
        );
        return filteredItems.length > 0
          ? { ...item, items: filteredItems }
          : null;
      } else {
        return pageAccess.some(access =>
          item.href.slice(1).startsWith(access)
        )
          ? item
          : null;
      }
    })
    .filter(Boolean) as (NavItem | NavGroup)[];
}

  const navGroups = React.useMemo(() => {
    if (session?.pageAccess?.length > 0) {
      return filterNavByAccess(NavGroupItems, session.pageAccess);
    } else {
      console.warn("No page access found in session, defaulting to dashboard");
      return filterNavByAccess(NavGroupItems, ["dashboard"]);
    }
  }, [session]);

  return (
    <Sidebar>
      <SidebarContent
        className={`gap-1 px-2 ${!isMobile ? "mt-[80px]" : ""} scrollbar-hide`}
      >
        {navGroups.map((item) => {
          // Render grouped menu
          if ("groupTitle" in item) {
            return (
              <Collapsible
                key={item.groupTitle}
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
                        {item.items.map((child) => {
                          const isActive = pathname === child.href;
                          return (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton asChild isActive={isActive}>
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
            <SidebarGroup key={item.title}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 font-semibold"
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
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
