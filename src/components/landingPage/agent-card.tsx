


// "use client";
// import { ArrowRight } from "lucide-react";
// import { Card } from "../ui/card";
// import { Button } from "../ui/button";

// function AgentTypeCard({
//   icon,
//   title,
//   phone,
//   description,
//   language,
//   handleinstructionOpen,
//   calls = ["Incoming"],
// }: {
//   icon: React.ReactNode;
//   title: string;
//   phone: string;
//   description?: string;
//   language?: string[];
//   handleinstructionOpen?: () => void;
//   calls?: string[];
// }) {
//   const defaultDescriptions: Record<string, string> = {
//     "Personal Assistants":
//       "Initial evaluation of the candidates to assess a candidate's communication skills via Phone call.",
//     "Appointment Booking":
//       "This agent helps you easily schedule, manage, and track appointments without any hassle.",
//     "Personal Assistant":
//       "This agent assists you with everyday tasks, organization, quick information lookup, and supports multiple languages.",
//   };

//   const finalDescription = defaultDescriptions[title];

//   return (
//     <Card
//       onClick={handleinstructionOpen}
//       className="relative flex flex-col justify-center p-4 sm:p-5 md:p-6 lg:p-8 min-h-[14rem] hover:bg-muted/50 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-primary/20 border-2 hover:border-primary/30"
//     >
//       {/* Tags - Top Right */}
//       <div className="absolute top-3 right-3 flex flex-wrap items-center gap-2 text-primary z-10">
//         <span
//           className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
//             calls[0] === "Incoming"
//               ? "bg-blue-100 text-blue-800 border-blue-200"
//               : calls[0] === "Outgoing"
//               ? "bg-green-100 text-green-800 border-green-200"
//               : "bg-purple-100 text-purple-800 border-purple-200"
//           }`}
//         >
//           {calls[0]}
//         </span>

//         {language && (
//           <span className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-semibold border border-primary/20">
//             {language.join(", ")}
//           </span>
//         )}
//       </div>

//       {/* Icon + Title */}
//       <div className="absolute top-3 left-4 sm:left-6 md:left-6 lg:left-9 flex gap-2 items-center mt-12 flex-wrap">
//         {icon}
//         <span className="text-lg sm:text-xl font-semibold text-foreground break-words">
//           {title}
//         </span>
//       </div>

//       {/* Description */}
//       <div className="mt-9 md:mt-16  lg:mt-9 text-sm sm:text-base text-muted-foreground indent-px max-w-full break-words pr-2">
//         {finalDescription}
//       </div>

//       {/* Try Now Button */}
//       {phone && (
//         <div className="absolute bottom-3 right-3">
//           <Button
//             className="h-8 px-3 text-xs sm:text-sm hover:bg-black hover:text-white group-hover/btn:bg-muted/30"
//             size="sm"
//             variant="default"
//             onClick={handleinstructionOpen}
//           >
//             <span className="group-hover/btn:translate-x-0.5 transition-transform duration-300">
//               Try Now
//             </span>
//             <ArrowRight
//               size={14}
//               className="ml-1 group-hover/btn:translate-x-0.5 transition-transform duration-300"
//             />
//           </Button>
//         </div>
//       )}
//     </Card>
//   );
// }

// export default AgentTypeCard;

"use client";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

function AgentTypeCard({
  icon,
  title,
  phone,
  description,
  language,
  handleinstructionOpen,
  calls = ["Incoming"],
}: {
  icon: React.ReactNode;
  title: string;
  phone: string;
  description?: string;
  language?: string[];
  handleinstructionOpen?: () => void;
  calls?: string[];
}) {
  const defaultDescriptions: Record<string, string> = {
    "Personal Assistants":
      "Initial evaluation of the candidates to assess a candidate's communication skills via Phone call.",
    "Appointment Booking":
      "This agent helps you easily schedule, manage, and track appointments without any hassle.",
    "Personal Assistant":
      "This agent assists you with everyday tasks, organization, quick information lookup, and supports multiple languages.",
  };

  const finalDescription = defaultDescriptions[title] || description;

  return (
    <Card
      onClick={handleinstructionOpen}
      className="relative flex flex-col justify-center p-4 sm:p-5 md:p-6 lg:p-8 min-h-[14rem] md:min-h-[16rem] lg:min-h-[16rem] transition-all duration-300 cursor-pointer group hover:bg-muted/50 hover:shadow-xl hover:shadow-primary/20 border-2 hover:border-primary/30 w-full"
    >
      {/* Tags - Top Right */}
      <div className="absolute top-3 right-3 flex flex-wrap items-center gap-2 text-primary z-10 max-w-[70%] justify-end">
        <span
          className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-semibold border ${
            calls[0] === "Incoming"
              ? "bg-blue-100 text-blue-800 border-blue-200"
              : calls[0] === "Outgoing"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-purple-100 text-purple-800 border-purple-200"
          }`}
        >
          {calls[0]}
        </span>

        {language && (
          <span className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-semibold border border-primary/20">
            {language.join(", ")}
          </span>
        )}
      </div>

      {/* Icon + Title */}
      <div className="absolute top-3 left-4 sm:left-6 md:left-6 lg:left-8 flex gap-2 items-center mt-12 flex-wrap max-w-[90%]">
        {icon}
        <span className="text-base sm:text-lg md:text-xl font-semibold text-foreground break-words">
          {title}
        </span>
      </div>

      {/* Description */}
      <div className="mt-3 md:mt-12 lg:mt-10 xl:mt-2 text-xs sm:text-sm md:text-base text-muted-foreground indent-px break-words pr-2">
        {finalDescription}
      </div>

      {/* Try Now Button */}
      {phone && (
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
          <Button
            className="h-8 px-3 text-xs sm:text-sm hover:bg-black hover:text-white group-hover/btn:bg-muted/30"
            size="sm"
            variant="default"
            onClick={handleinstructionOpen}
          >
            <span className="group-hover/btn:translate-x-0.5 transition-transform duration-300">
              Try Now
            </span>
            <ArrowRight
              size={14}
              className="ml-1 group-hover/btn:translate-x-0.5 transition-transform duration-300"
            />
          </Button>
        </div>
      )}
    </Card>
  );
}

export default AgentTypeCard;

