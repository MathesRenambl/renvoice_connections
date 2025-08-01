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
import { ChevronDown, LogOut, User, MenuIcon } from "lucide-react";
import { useSidebar } from "./sidebar";
import { useAppContext } from "@/hooks/context";
import { useLogOut } from "@/hooks/useLogout";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";

const Button = dynamic(
  () => import("../../components/ui/button").then((mod) => mod.Button),
  { ssr: false }
);

export function Header() {
  const logOut = useLogOut();
  const mobile = useMediaQuery("mobile");
  const { userData, isLogedIn, IMAGE_URL } = useAppContext();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [client, setIsClient] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, [userData]);

  return (
    <div className="fixed top-0 z-30 w-full border-b bg-white shadow-sm backdrop-blur-md">
      <div className="w-full flex justify-between h-16 items-center px-4 sm:px-6">
        {/* Left Section: Logo + Menu */}
        <div className="flex items-center gap-3 w-[200px]">
          <>
            <MenuIcon
              onClick={toggleSidebar}
              size={28}
              className="cursor-pointer hover:text-primary transition"
            />
            <Link href="/dashboard" className="flex items-center">
              {session?.orgLogo && (
                <Image
                  src={session?.orgLogo}
                  alt="Logo"
                  width={mobile ? 100 : 140}
                  height={40}
                  className="object-contain"
                  priority
                />
              )}
            </Link>
          </>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-3">
          {client && (
            <>
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
                    {/* <span className="hidden md:inline-flex">
                        {userData?.name}
                      </span> */}
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

                  {/* Credits */}
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="flex items-center gap-2 hover:bg-muted rounded-md px-3 py-2"
                    onClick={() => router.push("/profile")}
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <>
                    <DropdownMenuSeparator />
                  </>

                  <DropdownMenuItem
                    onClick={() => {
                      logOut();
                      // signOut({ redirect: true, callbackUrl: "/" });
                    }}
                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md px-3 py-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Logged Out View */}
          {/* {!isLogedIn && client
            ? pathname !== "/login" && (
                <Button
                  size="sm"
                  className="rounded-md"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </Button>
              )
            : pathname === "/" && (
                <Button
                  size="sm"
                  className="rounded-md"
                  onClick={() =>
                    redirectToPageByStatus(userData?.status, router)
                  }
                >
                  {userData?.status === "ACTIVE" ? (
                    <>
                      <LayoutDashboard className="mr-1" />
                      Dashboard
                    </>
                  ) : (
                    <>
                      <Forward className="mr-1" />
                      Continue
                    </>
                  )}
                </Button>
              )} */}
        </div>
      </div>
    </div>
  );
}
