'use client'
import { useRouter } from "next/navigation";
import { useAppContext } from "@/hooks/context";
import { signOut } from "next-auth/react";
export const useLogOut = (): (() => void) => {
 const{setUserData}=useAppContext()
  const router = useRouter();

  const logOut = () => {
     localStorage.clear();
    signOut({ redirect: true, callbackUrl: "/connectionLogin" });
    // setUserData(null)
    // router.push("/");
  };

  return logOut;
};