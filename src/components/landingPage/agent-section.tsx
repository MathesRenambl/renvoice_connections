


"use client";
import { BarChart3, Zap, MessageSquare, Calendar, Globe, Plus, AlertCircle, CheckCircle, Clock, Volume2, Headphones, Phone, Languages, CarFront, UserRoundSearch, FileUser, Users, Handshake, MessageCircleHeart, Building2, Copy, Check, PhoneOutgoing } from "lucide-react";
import AgentTypeCard from "./agent-card";
import { useCallback, useState } from "react";
import IphoneModal from "../landing/iphonemodal";
import SDKModal from "../Modal/sdkModal";
import MicrophoneWaveVisualizer from "@/app/(SDK)/renvoiceSDK/page";
import { useMediaQuery } from "@/hooks/useMediaQuery";



// Define types for the instructions
type InstructionStep = {
  number: number;
  title: string;
  description: string;
};

type openType = {
  show: boolean,
  callType: string
}
type AgentInstructions = {
  title: string;
  desc: string;
  ainumber?: number;
  steps: InstructionStep[];
  tips: string[];
};

type AgentsInstructions = Record<string, AgentInstructions>;


const agentsInstructions: AgentsInstructions = {
  "appointmentBooking": {
    "title": "Appointment Booking",
    "ainumber": 35393117,
    "desc": "This agent allows users to easily schedule and manage meetings using an interactive calendar interface.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "Choose the type of appointment — meeting, interview, or something else."
      },
      {
        "number": 2,
        "title": "State Your Request",
        "description": "Check open time slots and choose one that works for you."
      },
      {
        "number": 3,
        "title": "Provide Details",
        "description": "Just your name, contact, and what the appointment is about."
      },
      {
        "number": 4,
        "title": "Book It!",
        "description": "Confirm the details and you’re all set. You’ll get a message with the booking info."
      }
    ],
    "tips": [
      "Have your calendar ready to check availability",
      "Know the type of appointment you need beforehand",
      "Speak clearly when providing dates and times"
    ]
  },
  "aiFriend": {
    "title": "AI Friend ",
    "ainumber": 35393117,
    "desc": "This agent is your friendly, always-available AI companion that you can talk to just like a close friend over a phone call. ",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "Dial your AI Bestie anytime — no booking, no wait. It’s like calling a close friend."
      },
      {
        "number": 2,
        "title": "Start Chatting",
        "description": "Say “Hey!” or jump right into anything on your mind — your day, a joke, or even random thoughts."
      },
      {
        "number": 3,
        "title": "Engage Naturally",
        "description": "Your Bestie listens, gets your vibe, and chats back like a real friend — fun, caring, and natural."
      },
      {
        "number": 4,
        "title": "Explore Topics",
        "description": "Switch topics anytime, ask for advice, or just vent. Whatever’s on your mind, your Bestie’s here."
      }
    ],
    "tips": [
      "Treat it like talking to a real friend",
      "Don't hesitate to share your thoughts",
      "You can discuss hobbies, feelings, or daily experiences"
    ]
  },
  "leadGeneration": {
    "title": "Lead Generation",
    "ainumber": 35393119,
    "desc": "This Agent helps users to generate qualified leads by making the property discovery process easy, fast, and conversational.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "Call the AI Agent number — you'll be greeted and asked what type of land you’re looking for: residential, commercial, or agricultural."
      },
      {
        "number": 2,
        "title": "Provide Criteria",
        "description": "Quickly share your preferred location, budget, and plot purpose (like home, farming, or business)."
      },
      {
        "number": 3,
        "title": "Review Suggestions",
        "description": "The agent suggests suitable plots with details like price, size, approvals, and nearby landmarks."
      },
      {
        "number": 4,
        "title": "Request Details",
        "description": "If you're interested, just share your name, number, and a good time to chat. A real estate expert will follow up with you."
      }
    ],
    "tips": [
      "Have your target customer profile ready",
      "Be specific about your ideal lead characteristics",
      "Ask for email addresses or direct phone numbers if needed"
    ]
  },
  "conversationalRAG": {
    "title": "Conversational RAG",
    "ainumber": 35393117,
    "desc": "This Agent is designed to answer company-related queries in real time. It is ideal for customer support, internal helpdesks, HR queries, etc. by feeding Company documents, FAQs, policies, and internal knowledge bases into the agent.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "Dial the AI support number — the agent will greet you and is ready to help with anything company-related."
      },
      {
        "number": 2,
        "title": "Ask Questions",
        "description": "Whether it’s about services, policies, or departments like HR or support, just ask in your own words."
      },
      {
        "number": 3,
        "title": "Receive Answers",
        "description": "The agent pulls info from the company’s official knowledge base to give accurate, real-time responses."
      },
      {
        "number": 4,
        "title": "Follow Up",
        "description": "Need more details? Ask follow-ups like “Can you give an example?” — the AI will continue helping just like a real agent."
      }
    ],
    "tips": [
      "Questions can be about current events or specialized knowledge",
      "The AI can provide sources for its information",
      "Complex questions may be broken into multiple responses"
    ]
  },
  "surveyFeedback": {
    "title": "Survey/Feedback Instructions",
    "ainumber": 35393117,
    "desc": "This Agent calls customers after a purchase or delivery to collect feedback. It conducts a conversational survey, asking questions related to the user’s shopping experience.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "After your product is delivered, the AI agent calls you to ask for quick feedback."
      },
      {
        "number": 2,
        "title": "Answer Questions",
        "description": "It asks easy questions like your satisfaction rating or if the delivery was on time — just speak naturally."
      },
      {
        "number": 3,
        "title": "Provide Details",
        "description": "If there’s a problem, the agent asks follow-up questions so you can explain what went wrong."
      },
      {
        "number": 4,
        "title": "Complete Survey",
        "description": "Once done, it thanks you for your feedback and ends the call politely."
      }
    ],
    "tips": [
      "Have your experiences fresh in mind",
      "Be specific in your feedback",
      "Honest criticism is welcome and helpful"
    ]
  },
  // Job Screening Agent Name Changed to Personal Assistants
  "personalAssistants": {
    "title": "Personal Assistant",
    "ainumber": 35393118,
    "desc": "This Agent is designed to pre-screen job candidates. It helps recruiters and companies save time, filter applicants, and collect structured responses before a human interview.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "The AI calls the candidate and explains it will ask a few questions to assess fit for a job role."
      },
      {
        "number": 2,
        "title": "Answer Questions",
        "description": "It asks about the candidate’s background, skills, and experience — responses are analyzed for clarity and relevance."
      },
      {
        "number": 3,
        "title": "Provide Examples",
        "description": "The AI may ask for examples, like past projects, to understand practical experience with key skills."
      },
      {
        "number": 4,
        "title": "Complete Screening",
        "description": "After the questions, the AI ends the call and lets the candidate know that their responses will be shared with the hiring team."
      }
    ],
    "tips": [
      "Have your resume handy for reference",
      "Speak professionally and clearly",
      "Prepare for common interview questions"
    ]
  },
  "leadGenerationOt": {
    "title": "Lead Generation",
    "ainumber": 35393119,
    "desc": "This Agent helps users to generate qualified leads by making the property discovery process easy, fast, and conversational",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "The AI calls you and asks what kind of land you’re looking for — residential, commercial, or agricultural."
      },
      {
        "number": 2,
        "title": "Provide Criteria",
        "description": "You’ll answer a few simple questions about your preferred location, budget, and purpose of the land."
      },
      {
        "number": 3,
        "title": "Review Suggestions",
        "description": "Based on your answers, the agent suggests suitable plots with price ranges and key highlights."
      },
      {
        "number": 4,
        "title": "Request Details",
        "description": "If you’re interested, the agent collects your name and contact info and passes it to a real estate expert for follow-up."
      }
    ],
    "tips": [
      "Have your target customer profile ready",
      "Be specific about your ideal lead characteristics",
      "Ask for email addresses or direct phone numbers if needed"
    ]
  },
  "employeeSupport": {
    "title": "Employee Support",
    "ainumber": 35393112,
    "desc": "This Agent is designed to provide instant HR helpdesk and workplace support to employees. Whether it's related to leaves, payroll, or technical issues",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "The agent greets you and asks how it can help with HR-related matters like leave, payroll, or tech support."
      },
      {
        "number": 2,
        "title": "State Your Issue",
        "description": "Just explain what you need — like applying for leave or reporting a salary issue. The AI understands common workplace topics."
      },
      {
        "number": 3,
        "title": "Follow Guidance",
        "description": "The agent will either give you an immediate answer or guide you through the next steps to resolve the issue."
      },
      {
        "number": 4,
        "title": "Request Escalation",
        "description": "For complex or sensitive cases, the AI can notify HR or connect you with a human for follow-up."
      }
    ],
    "tips": [
      "Have relevant details ready (dates, names, policy numbers)",
      "Be clear about what resolution you're seeking",
      "The AI can provide policy documents if needed"
    ]
  },
  "personalAssistant": {
    "title": "Personal Assistant",
    "ainumber": 18273645,
    "desc": "This Assistant acts like a smart friend who’s always available. You can talk casually, ask about your day, get help with tasks, or just chat to clear your mind.",
    "steps": [
      {
        "number": 1,
        "title": "Say Hello",
        "description": "Start by greeting the assistant. It replies warmly and sets the tone for a relaxed conversation."
      },
      {
        "number": 2,
        "title": "Share Your Thoughts",
        "description": "Talk about anything how you feel, your plans, or questions you have. The assistant listens and responds like a friend would."
      },
      {
        "number": 3,
        "title": "Get Help",
        "description": "Need reminders, ideas, or information? The assistant helps you organize, suggest, or look things up quickly."
      },
      {
        "number": 4,
        "title": "Continue the Chat",
        "description": "Ask follow-up questions, change topics, or just keep chatting. The assistant is always ready to keep the conversation going."
      }
    ],
    "tips": [
      "Talk like you would to a friend no need to be formal",
      "Ask for advice when you're unsure or stuck",
      "Use it to plan your day or talk through decisions",
    ]
  },
  "webSearch": {
    "title": "Web Search",
    "ainumber": 35393117,
    "desc": "This Agent is your smart voice assistant that helps you find information instantly such as current news, local business details, weather updates, or answers to specific questions.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "The AI welcomes you and lets you know it’s ready to help with any web search."
      },
      {
        "number": 2,
        "title": "State Your Query",
        "description": "Ask about facts, news, prices, places, events — anything you’d usually Google."
      },
      {
        "number": 3,
        "title": "Receive Results",
        "description": "The AI searches the web and gives a clear, summarized response from reliable sources."
      },
      {
        "number": 4,
        "title": "Refine Search",
        "description": "Need more info? Just ask follow-ups — the conversation flows naturally without starting over."
      }
    ],
    "tips": [
      "Be as specific as possible with your query",
      "You can ask for sources or links to be emailed",
      "The AI can summarize lengthy information"
    ]
  },
  "translator": {
    "title": "Translator",
    "ainumber": 35393117,
    "desc": "This Agent is your smart voice assistant that helps you translate between multiple languages like regional languages and international languages, making it ideal for personal use, businesses, or customer service.",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "The AI greets you and asks which languages you want to translate between."
      },
      {
        "number": 2,
        "title": "Specify Languages",
        "description": "Just say, for example, “English to Tamil” or “Tamil to Hindi” — the AI will confirm and get ready."
      },
      {
        "number": 3,
        "title": "Speak or Spell",
        "description": "Speak a word or sentence clearly. You can spell it out if needed."
      },
      {
        "number": 4,
        "title": "Receive Translation",
        "description": "The AI speaks the correct translation clearly. You can ask for more or keep translating different phrases."
      }
    ],
    "tips": [
      "For accuracy, spell out uncommon words or names",
      "You can ask for the translation to be repeated slowly",
      "The AI can translate in both directions"
    ]
  },
  "carIntelligence": {
    "title": "Car Intelligence",
    "ainumber": 35393117,
    "desc": "This Agent is your virtual car assistant, available 24/7. It helps users diagnose car issues, answer vehicle-related questions, travel-related questions",
    "steps": [
      {
        "number": 1,
        "title": "Initiate Call",
        "description": "The Car Intelligence AI welcomes you and is ready to help with any car-related question or issue."
      },
      {
        "number": 2,
        "title": "Describe Issue",
        "description": "Just describe your issue or ask anything — like warning lights, travel time, or strange noises."
      },
      {
        "number": 3,
        "title": "Answer Questions",
        "description": "The AI might ask for more details to understand the problem better — like your location or symptoms."
      },
      {
        "number": 4,
        "title": "Receive Guidance",
        "description": "It then suggests what to do next or gives you the exact info you need, right away."
      }
    ],
    "tips": [
      "Have your car's make, model, and year ready",
      "Describe symptoms precisely (sounds, warning lights)",
      "The AI can suggest nearby repair shops if needed"
    ]
  }
}

// Define type for the agents data
type Agent = {
  icon: React.ReactNode;
  title: string;
  phone: string;
  description: string;
  callType: "Incoming" | "Outgoing" | "SDK";
  instructionKey: keyof typeof agentsInstructions;
  language: string;
};


const Ogagents: Agent[] = [
  {
    "icon": <Calendar />,
    "title": "Appointment Booking",
    "phone": "04435393115",
    "description": "This agent helps you easily schedule, manage, and track appointments without any hassle.",
    "callType": "Outgoing",
    "instructionKey": "appointmentBooking",
    "language": "English"
  },
  // {
  //   "icon": <MessageCircleHeart/>,
  //   "title": "AI Friend",
  //   "phone": "04435393114",
  //   "description": "This agent serves as your virtual companion, ready to chat, offer support, and keep you company any time of day.",
  //   "callType": "Outgoing",
  //   "instructionKey": "aiFriend"
  // },
  // {
  //   "icon": <Building2/>,
  //   "title": "Lead Generation",
  //   "phone": "04435393119",
  //   "description": "This agent helps improve your spoken English skills through interactive practice and personalized guidance.",
  //   "callType": "Outgoing",
  //   "instructionKey": "leadGeneration"
  // },
  // {
  //   "icon": <Handshake/>,
  //   "title": "Conversational AI with RAG",
  //   "phone": "04435393113",
  //   "description": "This agent engages in dynamic, intelligent conversations by retrieving real-time information to enhance responses.",
  //   "callType": "Outgoing",
  //   "instructionKey": "conversationalRAG"
  // },
]
const Inagents: Agent[] = [
  // {
  //   "icon": <MessageSquare/>,
  //   "title": "Survey/Feedback",
  //   "phone": "04435393117",
  //   "description": "This agent helps improve your spoken English skills through interactive practice and personalized guidance.",
  //   "callType": "Incoming",
  //   "instructionKey": "surveyFeedback"
  // },
  {
    "icon": <FileUser />,
    "title": "Personal Assistant",
    "phone": "04435393118",
    "description": "This agent helps improve your spoken English skills through interactive practice and personalized guidance.",
    "callType": "Incoming",
    "instructionKey": "personalAssistants",
    "language": "English"
  },
  // {
  //   "icon": <Users/>,
  //   "title": "Employee Support",
  //   "phone": "04435393112",
  //   "description": "This agent helps improve your spoken English skills through interactive practice and personalized guidance.",
  //   "callType": "Incoming",
  //   "instructionKey": "employeeSupport"
  // },
  // {
  //   "icon": <Building2/>,
  //   "title": "Lead Generation",
  //   "phone": "04435393119 ",
  //   "description": "This agent helps improve your spoken English skills through interactive practice and personalized guidance.",
  //   "callType": "Incoming",
  //   "instructionKey": "leadGenerationOt"
  // }
];


const Sdkagents: Agent[] = [
  {
    "icon": <UserRoundSearch />,
    "title": "Personal Assistant",
    "phone": "04435393108",
    "description": "This agent assists you with everyday tasks such as reminders, organization, and quick information lookup.",
    "callType": "SDK",
    "instructionKey": "personalAssistant",
    "language": "Multilingual"
  },
  // {
  //   "icon": <Globe/>,
  //   "title": "Web Search",
  //   "phone": "04435393110",
  //   "description": "This agent reads and condenses lengthy news articles into short, easy-to-understand summaries for quick reading.",
  //   "callType": "SDK",
  //   "instructionKey": "webSearch"
  // },
  // {
  //   "icon": <Languages/>,
  //   "title": "Translator",
  //   "phone": "04435393111",
  //   "description": "This agent provides accurate answers to a wide range of general knowledge and trivia questions.",
  //   "callType": "SDK",
  //   "instructionKey": "translator"
  // },
  // {
  //   "icon": <CarFront/>,
  //   "title": "Car Intelligence",
  //   "phone": "04435393112",
  //   "description": "This agent helps improve your spoken English skills through interactive practice and personalized guidance.",
  //   "callType": "SDK",
  //   "instructionKey": "carIntelligence"
  // }
];

 const languages = [
    { value: "english", label: "English" },
    { value: "tamil", label: "Tamil (தமிழ்)" },
    { value: "hindi", label: "Hindi (हिन्दी)" },
    { value: "kannada", label: "Kannada (ಕನ್ನಡ)" },
    { value: "malayalam", label: "Malayalam (മലയാളം)" },
    { value: "telugu", label: "Telugu (తెలుగు)" },
  ];

function  AgentSection() {

  const [open, setOpen] = useState<openType>({
    show: false,
    callType: "Incoming"
  })
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeInstruction, setActiveInstruction] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleInstructionOpen = (instructionKey: string, callType: string) => {
    console.log("CALLTYPE", callType)
    setOpen({ show: true, callType: callType })
    setActiveModal(instructionKey);
    console.log(agentsInstructions[instructionKey], "instruction")
    setActiveInstruction(agentsInstructions[instructionKey as keyof typeof agentsInstructions]);
  };

  const handleInstructionClose = () => {
    setOpen({ show: false, callType: "" })
    setActiveModal(null);
    setActiveInstruction(null);
  };

    // Handle language change
    const mobile = useMediaQuery("mobile");
    const handleLanguageChange = useCallback((language: string) => {
      setSelectedLanguage(language);
      console.log("Selected language:", language);
    }, []);

  return (
    <section className="w-full py-20" id="Agents">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Try our Voice Agents</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our voice agents are cheaper by 50% compared to a real customer agent.
            </p>
          </div>
        </div>


        {/* Row with 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {/* Incoming Agents */}
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-4">Incoming</div>
            {/*   
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"> */}
            <div className="space-y-4">
              {Inagents.map((agent, index) => (
                <AgentTypeCard
                  key={index}
                  icon={agent.icon}
                  title={agent.title}
                  phone={agent.phone}
                  description={agent.description}
                  handleinstructionOpen={() => handleInstructionOpen(agent.instructionKey, agent.callType)}
                  calls={[agent.callType]}
                  language={[agent.language || "English"]}
                />
              ))}
            </div>
          </div>

          {/* Outgoing Agents */}
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-4">Outgoing</div>
            <div className="space-y-4">
              {Ogagents.map((agent, index) => (
                <AgentTypeCard
                  key={index}
                  icon={agent.icon}
                  title={agent.title}
                  phone={agent.phone}
                  description={agent.description}
                  handleinstructionOpen={() => handleInstructionOpen(agent.instructionKey, agent.callType)}
                  calls={[agent.callType]}
                  language={[agent.language || "English"]}
                />
              ))}
            </div>
          </div>

          {/* SDK Agents */}
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-4">SDK</div>
            <div className="space-y-4">
              {Sdkagents.map((agent, index) => (
                <AgentTypeCard
                  key={index}
                  icon={agent.icon}
                  title={agent.title}
                  phone={agent.phone}
                  description={agent.description}
                  handleinstructionOpen={() => handleInstructionOpen(agent.instructionKey, agent.callType)}
                  calls={[agent.callType]}
                  language={[agent.language || "English"]}
                />
              ))}
            </div>
          </div>

        </div>
      </div>


      {/* Modal for Incoming call type agents */}
      <SDKModal
        open={open.show && open.callType !== 'SDK'}
        onClose={handleInstructionClose}
        title={activeInstruction?.title || "Instructions"}
        description={activeInstruction?.desc || "Step-by-step guide for using this agent"}
      >
        <div className="p-0 md:p-4  lg:p-6 sm:h-[100vh] md:h-auto w-[85vw] md:w-[80vw] lg:w-[60vw] bg-gradient-to-br from-gray-900 to-gray-800">
          {activeInstruction &&(
            <>
              <div className="mb-8 ">
                {/* Displayed number */}
                {/* {open.callType !== 'Incoming' ? <div className=" w-3/6 mx-auto text-center text-base lg:text-2xl font-bold text-gray-800 border mb-4 p-4 rounded-lg bg-gray-50 shadow-sm ">
                  {Ogagents.find(a => a.instructionKey === activeModal)?.phone}
                </div> : <IphoneModal number={activeInstruction?.ainumber} />} */}

                {/* Inside your component */}
                {open.callType !== 'Incoming' ? (
                  <div className="w-3/6 mx-auto text-center text-base lg:text-2xl font-bold text-gray-800 border mb-4 p-2 md:p-4 rounded-lg bg-gray-50 shadow-sm relative">
                   
                    {/* <a
                      href={`tel:${Ogagents.find(a => a.instructionKey === activeModal)?.phone}`}
                      className="block lg:hidden"
                    >
                      {Ogagents.find(a => a.instructionKey === activeModal)?.phone}
                    </a> */}
                    <a
                      href={`tel:${Ogagents.find(a => a.instructionKey === activeModal)?.phone}`}
                      className="inline-flex items-center gap-2 lg:hidden"
                    >
                      <div className="flex items-center justify-center w-7 h-7 bg-green-100 rounded-full">
                        <PhoneOutgoing className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">
                        {Ogagents.find(a => a.instructionKey === activeModal)?.phone}
                      </span>
                    </a>

                    <span className="hidden lg:inline">
                      {Ogagents.find(a => a.instructionKey === activeModal)?.phone}
                    </span>

                    <button
                      onClick={() => {
                        const number = Ogagents.find(a => a.instructionKey === activeModal)?.phone;
                        if (number) {
                          navigator.clipboard.writeText(number);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }
                      }}
                      title="Copy"
                      className={`hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 transition ${
                        copied ? 'text-blue-500' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                     {copied ? <Check/>: <Copy size={20}/>}
                    </button>
                  </div>
                ) : (
                  <div>
                      {/* Language Selection */}
                          <div className="flex justify-center mb-8">
                            <div className="bg-gray-800 rounded-xl p-2 md:p-4 shadow-lg border border-gray-700">
                              <div className="flex items-center space-x-3 mb-3">
                                <Globe className="text-blue-400" size={20} />
                                <span className="text-white font-medium">Select Language</span>
                              </div>
                              <div className={`${mobile ? " grid grid-cols-3" : "flex flex-wrap"}  gap-2 justify-evenly md:justify-center md:mb-2`}>
                                {languages.map((lang) => (
                                  <button
                                    key={lang.value}
                                    onClick={() => handleLanguageChange(lang.value)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-1/7 md:w-auto mb-2 md:mb-0 ${
                                      selectedLanguage === lang.value
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                                    }`}
                                  >
                                    {lang.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                    <IphoneModal 
                      number={activeInstruction?.ainumber}  
                      language={selectedLanguage}
                    />
                  </div>
                )}


                <div className="flex items-center mt-10 mb-5 lg:mt-2">
                  <Phone className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-white">How This Agent Works</h3>
                </div>

                <div className="space-y-4">
                  {activeInstruction.steps.map((step: any) => (
                    <div key={step.number} className="flex items-start space-x-2 p-3 md:p-4 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 ">
                <div className="flex items-center mb-4">
                  <Headphones className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Tips for Best Experience</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {activeInstruction.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleInstructionClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      </SDKModal>


      {/* Modal for Outgoing call type agents */}
      {/* <Modal
        open={activeModal === "surveyFeedback" || 
              activeModal === "jobScreening" || 
              activeModal === "employeeSupport"||
            activeModal === "leadGenerationOt"}
        onClose={handleInstructionClose}
        title={activeInstruction?.title || "Instructions"}
        description={activeInstruction?.desc|| "Step-by-step guide for using this agent"}
      >
        <div className="p-6">
          {activeInstruction && (
            <>
              <div className="mb-8">
            
            <IphoneModal number={activeInstruction?.ainumber}/>

                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">How This Agent Works</h3>
                </div>
                
                <div className="space-y-4">
                  {activeInstruction.steps.map((step: any) => (
                    <div key={step.number} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Volume2 className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Best Practices</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {activeInstruction.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button 
              onClick={handleInstructionClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      </Modal> */}



      {/* Modal for SDK call type agents */}
      <SDKModal
        open={open.show && open.callType === 'SDK'}
        onClose={handleInstructionClose}
        title={activeInstruction?.title || "Instructions"}
        description={activeInstruction?.desc || "Step-by-step guide for using this agent"}
      >
        <div className="p-0 md:p-4 w-[86vw] h-auto md:w-[80vw] lg:w-[60vw]">
          <div>
            {activeInstruction && (
              <>
                <div className="mb-8">
                  <div className="flex justify-center items-start">
                    <MicrophoneWaveVisualizer showTittle={false} />
                  </div>

                  <div className="flex items-center mt-6 mb-4">
                    <Phone className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-white">How This Agent Works</h3>
                  </div>

                  <div className="space-y-4">
                    {activeInstruction.steps.map((step: any) => (
                      <div key={step.number} className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {step.number}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Clock className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Pro Tips</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {activeInstruction.tips.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">{tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleInstructionClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </SDKModal>
    </section>
  )
}

export default AgentSection

