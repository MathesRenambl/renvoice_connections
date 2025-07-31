"use client";
import { getSession, signIn } from "next-auth/react";
import { MotionDiv } from "@/components/ui/motion-div";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert/alert";
import { useAppContext } from "@/hooks/context";
import {
  saveToLocalStorage,
} from "@/components/encryption/encryption";
import { useAlert } from "@/hooks/alertHook";
import LoginForm from "@/components/auth/loginForm";
import { debounceApiCall } from "@/lib/debounce";
import Preloader from "@/components/ui/presloader";


export default function LoginPage() {
  const { URL, setIsLogedIn, isLogedIn } = useAppContext();
  const { alert, showAlert, hideAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  
useEffect(() => {
  const checkSession = async () => {
    const session = await getSession();
    if (session?.accessToken) {
      router.push("/operationTvk/dashboard");
    }
  };
  checkSession();

  return(()=>{
    setIsLoading(false)
  })

}, []);
  const handleSubmit = async (formData:{memberEmail:string,memberPassword:string}) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
    redirect: false,
    ...formData,
    callbackUrl: "/dashboard"
  });

  console.log("response",res)
      if (res.status === 200) {
        const session = await getSession();
        saveToLocalStorage("orgId", session?.orgId);
        saveToLocalStorage("token", session?.accessToken);
        saveToLocalStorage("email", session?.user?.email);
        saveToLocalStorage("role", session?.role[0]);
        saveToLocalStorage("memberId", session?.memberId);
        saveToLocalStorage("orgLogo", session?.orgLogo);
        console.log("page access",session.pageAccess)
        router.replace(session.pageAccess[0]);
        setIsLoading(false);
      } else {
         setIsLoading(false)
        showAlert("Invalid Username or Password",'error')
       
      }
    } catch (error) {
      setIsLogedIn(false);
      console.log('error',error);
    }
  };
  const debouncedSubmit=debounceApiCall(handleSubmit, 1000)

  if(isLoading){
    return <Preloader/>
  }

  return (
    <div className=" w-full h-full flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md  md:border-2 border-primary/10 rounded-lg "
      >
        <LoginForm
          isLoading={isLoading}
          onSubmit={debouncedSubmit}
        />
      </MotionDiv>
      {alert && <Alert alert={alert} hideAlert={hideAlert} />}
    </div>
  );
}


