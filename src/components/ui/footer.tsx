// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Phone } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="border-t bg-background w-screen">
//       <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
//         <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
//           <Phone className="h-6 w-6" />
//           <p className="text-center text-sm leading-loose md:text-left">
//             &copy; {new Date().getFullYear()} Renvoice AI. All rights reserved.
//           </p>
//         </div>
//         <div className="flex gap-4">
//           <Link
//             href="/terms"
//             className="text-sm font-medium underline underline-offset-4"
//           >
//             Terms
//           </Link>
//           <Link
//             href="/privacy"
//             className="text-sm font-medium underline underline-offset-4"
//           >
//             Privacy
//           </Link>
//           <Link
//             href="/contactUs"
//             className="text-sm font-medium underline underline-offset-4"
//           >
//             Contact
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/hooks/context";
import { useMediaQuery } from "@/hooks/useMediaQuery";


export function Footer() {
  const mobile = useMediaQuery("mobile");
    const { IMAGE_URL } = useAppContext();
  // Function to handle smooth scrolling for internal links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId.replace('#', ''));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <footer className="border-t bg-muted/30 w-full px-4 md:px-8 lg:px-10 ">
      <div className="container mx-auto  py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-36 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <Phone className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Renvoice AI</h3> */}
                <Image
                            src={`${IMAGE_URL}/renvoice_logo.png`}
                            alt="Renvoice AI Logo"
                            width={mobile ? 100 : 140}
                            height={40}
                            className="object-contain"
                            priority
                          />
            </div>
            <p className="text-sm text-justify text-muted-foreground leading-relaxed md:w-3/4 lg:w-full">
              Renvoice AI empowers businesses with intelligent voice solutions to automate calls and analyze conversations. Unlock real-time insights and streamline communication for smarter, more efficient operations.
            </p>
          </div>


          {/* Quick Links */}
          {/* <div className="grid md:grid-cols-2 md:gap-20"> */}
          <div className="flex gap-24 lg:gap-40"> 
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a 
                href="#features" 
                onClick={(e) => handleSmoothScroll(e, '#features')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                Features
              </a>
              <Link 
                href="/pricing" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Pricing
              </Link>
              <a 
                href="#Agents" 
                onClick={(e) => handleSmoothScroll(e, '#Agents')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                Agents
              </a>
             
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Support</h4>
            <div className="flex flex-col space-y-2">
             
              <Link 
                href="/contactUs" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                 Terms & Conditions
              </Link>
             

            </div>
          </div>
          </div>
          {/* Contact Info */}
          <div className="space-y-4 w-full">
             <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col space-y-3">
              <Link href={'mailto:support@renvoice.ai'} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@renvoice.ai</span>
              </Link>
              {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 7200490494</span>
              </div> */}
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Renambl Technologies Pvt Ltd,<br/>
                  Greeta Techpark, 2nd Floor,<br/> VSI Industrial Estate,<br/> Perungudi, Chennai- 600096
                </span>
              </div>
            </div>
          </div> 
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Renvoice AI. All rights reserved.
          </div>
          
        
        </div>
      </div>
    </footer>
  );
}