"use client";
import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faBatteryFull,
  faSignal,
  faBell,
  faCommentDots,
  faPhoneSlash,
  faPhone,
  faVolumeHigh,
  faVolumeLow,
  faArrowUp,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/hooks/context";
import {
  getFromLocalStorage
} from "@/components/encryption/encryption";
import agentInstructions from "@/components/landingPage/agent-section";
import { useAlert } from "@/hooks/alertHook";
import Alert from "@/components/alert/alert";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { m } from "framer-motion";



export default function IphoneModal({number:number, language:setSelectedLanguage }: {number?: number, language?: string}) {
  const { URL } = useAppContext();
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(() => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

  const { alert, showAlert, hideAlert } = useAlert();

    const mobile = useMediaQuery("mobile");


const Ainum =number;
const Ailanguage = setSelectedLanguage;
console.log("Language sended", Ailanguage);




async function makecall(phone: string, topic: number, Ailanguage?: string) {
  console.log("Language in makecall:", Ailanguage);
  try {
    const response = await fetch(`${URL}/internal/makeCall`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: "0"+ phone,
        topic,
        language:Ailanguage,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log('Call started:', data);
      return data;
    } else {
     
      showAlert('Failed to start call. Please try again.', 'error');
      return null;
    }
  } catch (error: any) {
    
      showAlert('Failed to start call. Please try again.', 'error');
    return null;
  }
}



useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  updateTime(); 
  const interval = setInterval(updateTime, 30000); 

  return () => clearInterval(interval);
}, []);


  return (
    <> 
  
    <div className={`flex justify-center lg:mb-10  w-fit mx-auto px-2 ${mobile?"min-h-[55vh] mt-6":""} `}>
 
      <div className="relative w-[250px] h-[450px] rounded-[50px] overflow-hidden border-[8px] border-black/95 shadow-2xl bg-white">
        {/* Notch */}
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 z-30 w-[70px] h-[26px]  bg-black rounded-[18px] flex items-center justify-center">
          <div className="w-5 h-5 bg-[#0a0a0a] rounded-full"></div>
        </div>

        {/* Volume Buttons */}
        <div className="absolute right-[-12px] top-[120px] w-[4px] h-[60px] bg-gray-800 rounded-full z-50 shadow-md"></div>
        <div className="absolute left-[-12px] top-[90px] w-[4px] h-[80px] bg-gray-800 rounded-full z-50 shadow-md">
          <div className="absolute left-[-15px] top-[10px] w-[10px] h-[10px] flex items-center justify-center">
            <FontAwesomeIcon icon={faVolumeHigh} className="text-[8px] text-gray-600" />
          </div>
        </div>
        <div className="absolute left-[-12px] top-[180px] w-[4px] h-[80px] bg-gray-800 rounded-full z-50 shadow-md">
          <div className="absolute left-[-15px] top-[60px] w-[10px] h-[10px] flex items-center justify-center">
            <FontAwesomeIcon icon={faVolumeLow} className="text-[8px] text-gray-600" />
          </div>
        </div>
        <div className="absolute left-[-12px] top-[270px] w-[4px] h-[80px] bg-gray-800 rounded-full z-50 shadow-md"></div>

        {/* Status Bar */}
        <div
          className={`absolute top-3.5 left-0 w-full px-6 flex justify-between items-center z-40 ${showCallScreen ? "text-white" : "text-black"}`}
        >
          <div className="text-[12px] px-1 font-semibold"> {currentTime}</div>
          <div className="flex items-center space-x-2 text-[9px]">
            <FontAwesomeIcon icon={faSignal} />
            <FontAwesomeIcon icon={faWifi} />
            <FontAwesomeIcon icon={faBatteryFull} className="text-[12px]" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center h-full px-4 pt-[30px] pb-6 w-full relative">
          {showCallScreen && (
            <div className="absolute inset-0 bg-gray-900/80 z-10 rounded-[40px]"></div>
          )}

          {showCallScreen ? (
            <div className="w-full h-full rounded-xl p-4 flex flex-col justify-between items-center text-white z-20">
           <div className="flex flex-col items-center justify-center flex-1 space-y-1">
            <div className="text-lg font-semibold">RenVoice AI</div>
            <div className="text-[11px] text-gray-300">{phoneNumber}</div>
             <div className="text-[12px] text-gray-400 animate-pulse">OUTGOING...</div>
            </div>

              <div className="flex flex-col items-center space-y-5 py-0">
              <div className="flex  w-full py-9 px-9 text-[10px] text-white -mt-9 space-x-2 ">

                <div className="flex flex-col items-center space-y-1">
                  <button className="w-7 h-8 bg-gray-700/70 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faBell} className="text-l" />
                  </button>
                  <span className="text-[10px]">Remind Me</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <button className="w-7 h-8 bg-gray-700/70 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCommentDots} className="text-l" />
                  </button>
                  <span className="text-[10px]">Message</span>
                </div>
              </div>
              </div>




<div className="flex justify-center items-center w-full mb-14">
  {/* Incoming Call Button (Centered Large Phone Icon with Vibration Effect) */}
  <div className="flex flex-col items-center relative group">
    <div className="relative">
      {/* Side vibration dots */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        
      </div>

      {/* Main Phone Button */}
      <button
        className="relative  w-16 h-16  flex items-center justify-center animate-bounce "
        style={{
          animationDuration: '1.5s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
          <path fill="#32e246" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
        </svg>
        {/* <FontAwesomeIcon icon={faPhone} style={{color: "#32e246",}} /> */}
      </button>
    </div>
    {/* <span className="text-sm mt-2 text-white">Answer</span> */}

    {/* Tooltip */}
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="bg-white text-gray-600 text-[8px] px-2 py-2 rounded-lg shadow-lg whitespace-nowrap relative">
        Tap to answer the AI call
        <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
      </div>
    </div>
  </div>
</div>

            </div>
          ) : (
            <div className="bg-[#e0dfdb] rounded-xl shadow p-4 mt-6 space-y-4 w-full z-20">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="bg-black text-white font-bold text-xl w-8 h-8 flex items-center justify-center rounded">
                    R
                  </div>
                  <div>
                    <div className="font-semibold text-[13px]">Renvoice's AI</div>
                    <div className="text-[11px] text-gray-600">Make your customers happy!</div>
                  </div>
                </div>
                {/* <div className="text-[11px] text-gray-700 pt-1">9:41 AM</div> */}
              </div>

              {/* Phone Number Input */}
              <div className="bg-[#a8a6a3] rounded-xl shadow p-4 space-y-4 w-full">
                {/* <input
                  type="text"
                  placeholder="09345678634"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setAttemptedSubmit(false);
                  } }
                  className="w-full py-2 px-3 rounded-md border border-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white" 
                  /> */}
                  <input
  type="tel"
  placeholder="9876543210"
  value={phoneNumber}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 10) {
      setPhoneNumber(value); // Ensure it starts with 0
    }
    setAttemptedSubmit(false);
  }}
  className="w-full py-2 px-3 rounded-md border border-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
/>

                {attemptedSubmit && phoneNumber.trim() === "" && (
                  <p className="text-red-600 text-xs">Enter the number to make a call</p>
                )}
               <button
                 className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-[#525252] transition"
                   onClick={async () => {
                       if (phoneNumber.trim() === "") {
                   setAttemptedSubmit(true);
                } else {
    const response = await makecall(phoneNumber, Ainum, Ailanguage);
    if (response) {
      setShowCallScreen(true); // Only if response.status === 200
    }
  }
                  }}
                  >Let's Talk</button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
          {alert && <Alert alert={alert} hideAlert={hideAlert} />}

    </>
  );
}
