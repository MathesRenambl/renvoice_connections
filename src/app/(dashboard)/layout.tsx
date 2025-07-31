"use client";

import { Header } from "@/components/ui/header";
import  Sidebar  from "@/components/ui/sidebarComponent";
import { useAppContext } from "@/hooks/context";

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
    <div className="flex h-[calc(100vh-4.1rem)] w-full ">
      <Header />
      <Sidebar />
      <div className=" h-auto w-full ">
        <main className="p-4 md:p-6 h-auto w-full ">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
