"use client";
import { getFromLocalStorage } from "@/components/encryption/encryption";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  ticketId:string;
  WEBSOCKETURL:string;
  setTicketId;
  chatOpen:boolean;
  setChatOpen:React.Dispatch<React.SetStateAction<any>>;
  URL: string;
  LogUrl: string;
  IMAGE_URL:string
  isLogedIn: boolean;
  setIsLogedIn: React.Dispatch<React.SetStateAction<any>>;
  videoModel:boolean;
  setVideoModel:React.Dispatch<React.SetStateAction<any>>;
  role:string;
}



const AppContext = createContext<AppContextType | null>(null);

import { ReactNode } from "react";
const URL = process.env.NEXT_PUBLIC_END_POINT;
const LogUrl = process.env.NEXT_PUBLIC_LOGS_END_POINT;
const WEBSOCKETURL = process.env.NEXT_PUBLIC_WEBSOCKET;
const IMAGE_URL= process.env.NEXT_PUBLIC_DIGIT_OCEAN
const token = getFromLocalStorage("token");
const orgId = getFromLocalStorage("orgId");
const email = getFromLocalStorage("email");
const role = getFromLocalStorage("role");
const logedIn = token!==null && orgId!==null && name !==null&& email!==null;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLogedIn, setIsLogedIn] = useState<boolean>(
  logedIn
  );
  const [userData, setUserData] = useState<Record<string, string>>({
    email: email,
    orgId: orgId,
    role:role
  });
  const [ticketId,setTicketId] = useState<string>('')
  const [chatOpen,setChatOpen]= useState<boolean>(false);
  const [videoModel,setVideoModel] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={{
        ticketId,
        setTicketId,
        userData,
        setUserData,
        URL,
        isLogedIn,
        setIsLogedIn,
        chatOpen,
        setChatOpen,
        IMAGE_URL,
        WEBSOCKETURL,
        videoModel,
        setVideoModel,
        role:role,
        LogUrl
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
