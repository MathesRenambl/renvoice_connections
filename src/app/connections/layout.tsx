"use client";
import  Sidebar  from "@/app/connections/components/sideNavBar";
import { useAppContext } from "@/hooks/context";
import { Header } from "../../components/landing/header";
import { CreditProvider } from "@/context/creditContext";

export default function DashboardLayout({ children } : { children: React.ReactNode; }) {
  // const [chatOpen,setChatOpen] = useState(false)
    const {chatOpen,setChatOpen} = useAppContext();
    const toggleWidget = () => setChatOpen(!chatOpen);
    const {ticketId,setTicketId} = useAppContext()
    
  return (
    <>

        <div className="flex flex-col min-h-screen w-full">

            <CreditProvider>
                <Header/>
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        {children}
                    </main>      
                </div>
            </CreditProvider>
        </div>
    </>
  );
}
