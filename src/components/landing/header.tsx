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
import {
  ChevronDown,
  Settings,
  LogOut,
  User,
  HelpCircle,
  MenuIcon,
  Forward,
  LayoutDashboard,
} from "lucide-react";
import { useAppContext } from "@/hooks/context";
import { redirectToPageByStatus } from "@/lib/utils";
import { useLogOut } from "@/hooks/useLogout";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = dynamic(
  () => import("../../components/ui/button").then((mod) => mod.Button),
  { ssr: false }
);

export function Header() {
  const logOut = useLogOut();
  const mobile = useMediaQuery("mobile");
  const { userData, isLogedIn, IMAGE_URL } = useAppContext();
  // const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [client, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, [userData]);

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-white shadow-sm backdrop-blur-md">
      <div className="w-full flex justify-between h-16 items-center px-4 sm:px-6">
        {/* Left Section: Logo + Menu */}
        <div className="flex items-center gap-3 w-[200px]">
          {userData?.status === "ACTIVE" && pathname !== "/" && (
            <MenuIcon
              // onClick={toggleSidebar}
              size={28}
              className="cursor-pointer hover:text-primary transition"
            />
          )}
          <Link href="/" className="flex items-center">
            <Image
              src={`${IMAGE_URL}/renvoice_logo.png`}
              alt="Renvoice AI Logo"
              width={mobile ? 100 : 140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-3">
          {isLogedIn && client && (
            <>
              {userData?.name && pathname !== "/" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 font-medium px-3 py-1 rounded-md hover:bg-muted transition"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {userData?.name?.charAt(0) || ""}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-flex">
                        {userData?.name}
                      </span>
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
                    {userData?.status === "ACTIVE" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="flex items-center gap-2 text-yellow-600 font-semibold">
                          ⚡ Credits
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          className="flex flex-col items-start gap-1 px-3 py-2 hover:bg-yellow-50 cursor-pointer rounded-md"
                          onClick={() => router.push("/credits")}
                        >
                          <div className="flex items-center gap-2 text-yellow-600 font-medium">
                            <FontAwesomeIcon
                              icon="bolt"
                              className="text-yellow-400"
                            />
                            Manage your credits
                          </div>
                          <div className="text-xs text-muted-foreground ml-6">
                            <div>
                              Total credits:{" "}
                              <span className="font-semibold text-black">
                                {userData.totalCredits || 1000}
                              </span>
                            </div>
                            <div>
                              Remaining:{" "}
                              <span className="font-semibold text-green-600">
                                {userData.remainingCredits || 600}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    {userData?.status === "ACTIVE" && (
                      <DropdownMenuItem
                        className="flex items-center gap-2 hover:bg-muted rounded-md px-3 py-2"
                        onClick={() => router.push("/profileConnection")}
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {userData?.status === "ACTIVE" && (
                      <>
                        <DropdownMenuItem className="flex items-center gap-2 hover:bg-muted rounded-md px-3 py-2">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 hover:bg-muted rounded-md px-3 py-2">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Help</span>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                      </>
                    )}

                    <DropdownMenuItem
                      onClick={logOut}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md px-3 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}

          {/* Logged Out View */}
          {client && pathname==='/' &&(
                <Button
                  size="sm"
                  className="rounded-md"
                  onClick={() => router.push("/login")}
                >
                Login
                </Button>
              )}
        </div>
      </div>
    </div>
  );
}
