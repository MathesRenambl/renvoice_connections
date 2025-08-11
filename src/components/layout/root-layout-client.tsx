"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider } from "../ui/sidebar";
import { useAppContext } from "@/hooks/context";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/alertHook";
import { redirectToPageByStatus } from "@/lib/utils";
import Preloader from "../ui/presloader";
import { Header } from "../landing/header";
export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
//  const{isLogedIn}=useAppContext();
 const {alert,hideAlert,showAlert}=useAlert();
 const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const router=useRouter()
//  useEffect(()=>{
//     if(pathname==='/login' || pathname==='/signup' || pathname==='/signIn'){
//       router.push('/')
//       return;
//     }
//     const status=getFromLocalStorage('status')
//     if(protectedRoute.includes(pathname) && !isLogedIn){
//       router.push('/')
//     }else if(isLogedIn && status !=='ACTIVE' &&pathname!=='/'&&!pathname.includes("/blog")){
//       redirectToPageByStatus(status,router,showAlert)
//     }
//  },[pathname])

 if(Loading) {
    return (
     <Preloader/>
    );
  }

  return (
    <>
    <SidebarProvider>
      <div className="min-w-full">
        {/* <Header /> */}
      <main className="flex flex-1">
        {children}
      </main> 
     </div>
     </SidebarProvider>
     
    </>
  );
}

