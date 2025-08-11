"use client";

import  Sidebar  from "@/app/connections/components/sideNavBar";
import { useAppContext } from "@/hooks/context";
import { Header } from "../../components/landing/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [chatOpen,setChatOpen] = useState(false)
    const {chatOpen,setChatOpen} = useAppContext();
    const toggleWidget = () => setChatOpen(!chatOpen);
    const {ticketId,setTicketId} = useAppContext()
    
    
  return (
    <>
    <div className="w-full">

        <Header/>
        <div className="flex h-[calc(100vh-4.1rem)]">
            <Sidebar />
            <div className=" h-auto w-full ">
                <main className="p-4 md:p-6 h-auto w-full ">
                {children}
                </main>
            </div>            
        </div>
    </div>
    </>
  );
}
