import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqData = [
  {
    question: "What can I do with this AI Agent platform?",
    answer: "You can create and manage AI-powered  agents that handle incoming and outgoing calls automatically for use cases like appointment booking, customer support, translation, and more.",
  },
  {
    question: "How do I set up my own AI voice agent?",
    answer: "Once you purchase a phone number from the platform, you can assign it to a workflow-based AI agent. You can customize the agent’s name, voice behavior, and calling logic without any coding.",
  },
  {
    question: "What types of AI agents are available?",
    answer: "We offer prebuilt AI agents like Appointment Booking, AI Friend, Translator, Feedback/Survey, Customer Support, and more — all of which can be customized for your needs.",
  },
  {
    question: "Can the agents handle both incoming and outgoing calls?",
    answer: "Yes. You can configure each agent to either receive incoming calls, make outbound calls, or do both, based on your business requirements.",
  },
  {
    question: "Do I need technical knowledge to use this platform?",
    answer: "Not at all. The platform is designed for ease of use. You can set up voice workflows using a simple interface and manage everything from your dashboard without writing code.",
  },
  {
    question: "Can I integrate the AI agents with my existing tools or CRM?",
    answer: "Yes, our workflows support API calls, Google Sheets, CRMs, and other integrations so your agents can fetch or update real-time data during a call.",
  },
];



export function FAQ() {
  return (
  <div className="h-auto bg-gray-50 py-10 px-4">
    <div className="max-w-4xl mx-auto"> 
       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-5">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">FAQs</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find quick answers to the most common questions we receive.            </p>
          </div>
        </div>
      <Accordion type="single" collapsible className="w-full space-y-1">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 pb-2">
            <AccordionTrigger className="text-left font-medium md:font-semibold text-base md:text-xl py-5 hover:no-underline">
              {item.question}
            </AccordionTrigger>

            <AccordionContent className="text-gray-700 text-base md:text-lg py-2 italic border-l-4 border-gray-300 pl-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);

}
