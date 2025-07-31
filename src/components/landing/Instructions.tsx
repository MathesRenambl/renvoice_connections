'use client';

import React, { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/hooks/context";



export default function Instructions(): JSX.Element {
  const{IMAGE_URL}=useAppContext()
  const [activeStep, setActiveStep] = useState(0);


  const steps = [
  {
    title: "Sign Up",
    description:
      "Click the “Sign Up” button on the top right and create your free account in seconds.",
    image: `${IMAGE_URL}/signuppage.png`,
  },
  // {
  //   title: "Set Up Your Profile",
  //   description:
  //     "Add your company details and preferences to personalize your experience.",
  //   image: "/Images/setupprofile.png",
  // },
  // {
  //   title: "Agentic Workflow Editor",
  //   description:
  //     "A visual editor for building logic and behavior of agents using node-based flows (like n8n or React Flow).",
  //   image: "/Images/AI-Agentic-img.png",
  // },
  {
    title: "Purchase a number",
    description:
      "Purchase a number to enable call connections with an agent using your selected or custom agentic workflow.",
    image:  `${IMAGE_URL}/purchasePhone.png`,
  },
  {
    title: "Start building Agentic Workflows",
    description:
      "Build Agentic Workflows to automate tasks using custom flows or ready-made templates.",
    image: `${IMAGE_URL}/workflowsc.png`,
  },
  // {
  //   title: "AI Calls Application",
  //   description:
  //     "Use our AI agent to handle calls for tasks like customer support, appointment booking, surveys, and more.",
  //   image: "/Images/Aicallimg.png",
  // },
];

  // Auto slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    // <section className="w-full py-20 bg-white dark:bg-gray-900">
    <section className="w-full pt-20  lg:pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-2 md:px-8  ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Getting Started</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Getting Started: Follow simple steps to set up and begin using the site effectively.
                  </p>
                </div>
        </div>
        {/* <div className="flex flex-col max-h-fit lg:flex-row gap-10 items-start space-y-4">
        <div className="w-full lg:w-1/2 space-y-4 mt-6">
          
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              className={`cursor-pointer p-4 rounded-xl border flex items-start gap-3 transition ${
                activeStep === index
                  ? "bg-white dark:bg-muted/20 shadow"
                  : "bg-gray-100 dark:bg-muted/10"
              }`}
            >
              <div className="text-2xl font-semibold">{index + 1}</div>
              <div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 ">
         <div className="w-full h-[420px] rounded-xl hidden md:flex items-center justify-center">
            <div className="relative w-full h-full max-w-[700px] mx-auto rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-sm">

              <Image
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        </div> */}
       <div className="flex flex-col lg:flex-row gap-12 items-start">
  <div className="w-full lg:w-1/2 space-y-3">
    {steps.map((step, index) => (
      <div
        key={index}
        onClick={() => setActiveStep(index)}
        className={`cursor-pointer p-6 rounded-2xl border-2 flex items-start gap-5 transition-all duration-300 hover:shadow-lg ${
          activeStep === index
            ? "bg-gray-100 border-gray-300 text-black shadow-xl transform translate-x-1"
            : "bg-white border-gray-200 text-black hover:border-gray-400"
        }`}
      >
        <div 
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors ${
            activeStep === index
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-xl mb-2 ${
            activeStep === index ? "text-black" : "text-black"
          }`}>
            {step.title}
          </h3>
          <p className={`text-base leading-relaxed ${
            activeStep === index ? "text-gray-700" : "text-gray-600"
          }`}>
            {step.description}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Professional Image Display */}
  <div className="w-full lg:w-1/2">
    <div className="w-full h-[440px] rounded-3xl hidden lg:flex items-center justify-center bg-gray-50 border-2 border-gray-200 shadow-lg">
      <div className="relative w-full h-full max-w-[700px] mx-auto rounded-3xl overflow-hidden bg-white border border-gray-100">
        {/* Professional Header with Title */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="text-sm font-medium text-gray-500 tracking-wide">
            STEP {String(activeStep + 1).padStart(2, '0')}
          </div>       
          {/* <h4 className="text-lg font-medium text-black">
            {steps[activeStep].title}
          </h4> */}
        </div>
        
        {/* Image Container */}
        <div className="absolute inset-0 pt-16 pb-12 p-6">
          <div className="relative w-full h-full">
            <Image
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              fill
              className="object-contain transition-opacity duration-500"
              priority
            />
          </div>
        </div>
        
        {/* Professional Footer with Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200 flex items-center justify-center">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeStep === index
                    ? "bg-black scale-125"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    
    {/* Mobile Image Display */}
    {/* <div className="w-full h-[300px] rounded-2xl md:hidden bg-gray-50 border border-gray-200 overflow-hidden">
      <div className="relative w-full h-full p-4">
        <Image
          src={steps[activeStep].image}
          alt={steps[activeStep].title}
          fill
          className="object-contain"
        />
      </div>
    </div> */}
  </div>
</div>
      </div>
    </section>
  );
}
