// components/SessionListener.tsx
"use client";
import { useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { saveToLocalStorage } from "../encryption/encryption";

interface Props {
  initialSession: Session | null;
}

export default function SessionListener({ initialSession }: Props) {
  const { data: session } = useSession();

  useEffect(() => {
    const activeSession = session ?? initialSession;  
    if (activeSession) {
      saveToLocalStorage("token", activeSession?.accessToken);
      saveToLocalStorage("role", activeSession?.role[0]);
      saveToLocalStorage("memberId", activeSession?.memberId);
      saveToLocalStorage("orgId", activeSession?.orgId);
      saveToLocalStorage("role", activeSession?.orgLogo);
    } else {
      localStorage.clear();
    }
  }, [session, initialSession]);

  return null;
}
