import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, LogOut, User, MenuIcon, Coins, Plus, Bolt } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppContext } from "@/hooks/context";
import { useLogOut } from "@/hooks/useLogout";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCredit } from "@/context/creditContext";
// import sideNavBar from "../../app/connections/components/sideNavBar";

const Button = dynamic(
  () => import("@/components/ui/button").then((mod) => mod.Button),
  { ssr: false }
);

export function Header() {
  const logOut = useLogOut();
  const mobile = useMediaQuery("mobile");
  const { userData, isLogedIn } = useAppContext();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [client, setIsClient] = useState<boolean>(false);
  const { credits } = useCredit();

  useEffect(() => {
    setIsClient(true);
  }, [userData]);

  // Get credit points from userData (adjust property name as needed)
  const creditPoints = userData?.credits || userData?.creditPoints || 0;

  const handleAddCredits = () => {
    // Navigate to credits/billing page or open add credits modal
    router.push("/connections/purchaseCredits");
  };

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-white shadow-sm backdrop-blur-md">
      <div className="w-full flex justify-between h-16 items-center px-4 sm:px-6">
        {/* Left Section: Logo + Menu */}
        <div className="flex items-center gap-3 w-[200px]">
          <MenuIcon
            onClick={toggleSidebar}
            size={28}
            className="cursor-pointer hover:text-primary transition"
          />
          <Link href="/dashboard" className="flex items-center">
            {/* Placeholder logo - replace with your actual logo */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg text-gray-800">
                <Image
                  src="/renvoice.png"
                  alt="Logo"
                  width={mobile ? 100 : 140}
                  height={40}
                  className="object-contain"
                  priority
                />
              </span>
            </div>
            
            {/* Alternative: Image logo (uncomment when you have your logo) */}
            {/* <Image
              src="/your-logo.png"
              alt="Logo"
              width={mobile ? 100 : 140}
              height={40}
              className="object-contain"
              priority
            /> */}
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-3">
          {/* Credit Points Display */}
          {client && isLogedIn && (
            <div className="flex items-center gap-2">
              {/* Credits Display */}
              <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-gray-50 to-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                <Bolt className="h-4 w-4 text-gray-600 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">
                  {credits.toLocaleString()}
                </span>
              </div>

              {/* Add Credits Button (Desktop) */}
              {!mobile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddCredits}
                  className="gap-1 text-xs hover:bg-gray-50 border-gray-200 text-gray-600"
                >
                  <Plus className="h-3 w-3" />
                  Add Credits
                </Button>
              )}
            </div>
          )}

          {/* User Dropdown */}
          {client && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 font-medium px-3 py-1 rounded-md hover:bg-muted transition"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="min-w-56 p-2 rounded-lg shadow-lg border bg-white space-y-1"
              >
                <DropdownMenuLabel className="text-[13px] text-gray-600">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Credits in Dropdown (Mobile) */}
                {mobile && (
                  <>
                    <DropdownMenuItem
                      className="flex items-center justify-between gap-2 hover:bg-muted rounded-md px-3 py-2"
                      onClick={handleAddCredits}
                    >
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-blue-600" />
                        <span>Credits</span>
                      </div>
                      <span className="text-sm font-medium text-blue-700">
                        {creditPoints.toLocaleString()}
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem
                  className="flex items-center gap-2 hover:bg-muted rounded-md px-3 py-2"
                  onClick={() => router.push("/connections/profileConnection")}
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    logOut();
                  }}
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md px-3 py-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}