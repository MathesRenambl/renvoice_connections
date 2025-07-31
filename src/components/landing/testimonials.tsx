
// 'use client';

// import * as React from "react";
// import Image from "next/image";
// import { Star, ChevronLeft, ChevronRight } from "lucide-react";
// import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

// export function Testimonials(): React.JSX.Element {
//   const scrollRef = React.useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -300 : 300,
//         behavior: "smooth",
//       });
//     }
//   };

//   const testimonialsData = [
//     {
//       name: "Jane Doe",
//       role: "CTO, TechNova",
//       quote: "The AI agent saved us hours each week and transformed our customer interaction process.",
//       image: "/Images/testimonial2.png",
//       rating: 5,
//     },
//     {
//       name: "John Smith",
//       role: "Founder, SmartCall AI",
//       quote: "We've seen a 40% improvement in lead engagement using their telephonic interface.",
//       image: "/Images/testimonial3.png",
//       rating: 4,
//     },
//     {
//       name: "Sara Lee",
//       role: "Product Manager, NeoTech",
//       quote: "Agentic workflows are game-changers for building complex automation with ease.",
//       image: "/Images/testimonial4.png",
//       rating: 5,
//     },
//     {
//       name: "David Kim",
//       role: "Head of Ops, CloudCorp",
//       quote: "Incredible time savings and error reduction. This tool is a must-have.",
//       image: "/Images/testimonial5.png",
//       rating: 5,
//     },
//     {
//       name: "Mark Zuckerberg",
//       role: "Co-founder, Facebook",
//       quote: "Reliable, fast, and smart — exactly what we needed.",
//       image: "/Images/testimonial6.png",
//       rating: 4,
//     },
//         {
//       name: "Satya Nadella",
//       role: "CEO, Microsoft",
//       quote: "Incredible time savings and error reduction. This tool is a must-have.",
//       image: "/Images/testimonial7.png",
//       rating: 5,
//     },
//     {
//       name: "Linda Zhang",
//       role: "AI Engineer, AutomateAI",
//       quote: "Reliable, fast, and smart — exactly what we needed.",
//       image: "/Images/testimonial8.png",
//       rating: 4,
//     },
//   ];

//   return (
//     <section className="w-full py-20 relative">
//       <div className="container px-4 md:px-6">
//         <div className="text-center space-y-4 mb-8">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//             What Our Users Say
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto md:text-xl">
//             Trusted by professionals and businesses worldwide.
//           </p>
//         </div>

//         {/* Arrows */}
//         <div className="relative">
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-muted/40 p-2 rounded-full shadow-md"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-muted/40 p-2 rounded-full shadow-md"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>

//           {/* Scrollable Row */}
//           <div
//             ref={scrollRef}
//             className="flex overflow-x-auto space-x-6 snap-x snap-mandatory px-2 pb-4 scroll-smooth"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {testimonialsData.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="snap-start shrink-0 w-80"
//                 style={{ scrollSnapAlign: "start" }}
//               >
//                 <TestimonialCard {...testimonial} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// type TestimonialCardProps = {
//   name: string;
//   role: string;
//   quote: string;
//   image: string;
//   rating: number;
// };

// function TestimonialCard({ name, role, quote, image, rating }: TestimonialCardProps): JSX.Element {
//   return (
//     <div className="p-6 border rounded-xl shadow-sm bg-white dark:bg-muted/30 flex flex-col h-full transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
//       <HoverCard>
//         <HoverCardTrigger asChild>
//           <div className="flex items-center mb-4 space-x-4 cursor-pointer">
//             <Image
//               src={image}
//               alt={name}
//               width={48}
//               height={48}
//               className="rounded-full object-cover"
//             />
//             <div>
//               <p className="text-sm font-semibold">{name}</p>
//               <p className="text-xs text-muted-foreground">{role}</p>
//             </div>
//           </div>
//         </HoverCardTrigger>
//         <HoverCardContent className="text-sm text-muted-foreground italic">
//           “{quote}”
//         </HoverCardContent>
//       </HoverCard>

//       <p className="text-sm text-muted-foreground italic mb-4 mt-2">“{quote}”</p>

//       <div className="flex space-x-1 mt-auto">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <Star
//             key={i}
//             size={16}
//             className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { JSX } from "react";

export function Testimonials(): React.JSX.Element {
  const testimonialsData = [
    {
      name: "Jane Doe",
      role: "CTO, TechNova",
      quote: "The AI agent saved us hours each week and transformed our customer interaction process.",
      image: "/Images/testimonial2.png",
      rating: 5,
    },
    {
      name: "John Smith",
      role: "Founder, SmartCall AI",
      quote: "We've seen a 40% improvement in lead engagement using their telephonic interface.",
      image: "/Images/testimonial3.png",
      rating: 4,
    },
    {
      name: "Sara Lee",
      role: "Product Manager, NeoTech",
      quote: "Agentic workflows are game-changers for building complex automation with ease.",
      image: "/Images/testimonial4.png",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Head of Ops, CloudCorp",
      quote: "Incredible time savings and error reduction. This tool is a must-have.",
      image: "/Images/testimonial5.png",
      rating: 5,
    },
    {
      name: "Mark Zuckerberg",
      role: "Co-founder, Facebook",
      quote: "Reliable, fast, and smart — exactly what we needed.",
      image: "/Images/testimonial6.png",
      rating: 4,
    },
    {
      name: "Satya Nadella",
      role: "CEO, Microsoft",
      quote: "Incredible time savings and error reduction. This tool is a must-have.",
      image: "/Images/testimonial7.png",
      rating: 5,
    },
    {
      name: "Linda Zhang",
      role: "AI Engineer, AutomateAI",
      quote: "Reliable, fast, and smart — exactly what we needed.",
      image: "/Images/testimonial8.png",
      rating: 4,
    },
  ];

  const logoPaths = [
    "/Images/logo1.jpg",
    "/Images/logo2.png",
    "/Images/logo6.png",
    "/Images/logo7.png",
    "/Images/logo8.png",
    "/Images/logo9.png",
    "/Images/logo11.png",
    "/Images/logo13.png",
    "/Images/logo5.png",
    "/Images/logo15.png",
    "/Images/logo17.png",
    "/Images/logo19.png",
    "/Images/logo21.png",
    "/Images/logo1.jpg",
    "/Images/logo2.png",
    "/Images/logo6.png",
    "/Images/logo7.png",
    "/Images/logo8.png",
    "/Images/logo9.png",
    "/Images/logo11.png",
    "/Images/logo13.png",
    "/Images/logo5.png",
    "/Images/logo15.png",
    "/Images/logo17.png",
    "/Images/logo19.png",
    "/Images/logo21.png",
  ];

  return (
    <section className="w-full py-20 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto md:text-xl">
            Trusted by professionals and businesses worldwide.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="px-4">
            {testimonialsData.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 px-2"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Company logos scrolling in two rows */}
        <div className="mt-16 space-y-6 overflow-hidden relative">
          {/* Row 1 - scroll left */}
          <div className="overflow-hidden">
            <div className="flex gap-12 animate-scroll-left whitespace-nowrap w-[90vw]">
              {[...logoPaths, ...logoPaths].map((logo, index) => (
                <Image
                  key={`row1-${index}`}
                  src={logo}
                  alt={`Company Logo ${index}`}
                  width={120}
                  height={60}
                  className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          </div>

          {/* Row 2 - scroll right with no gap and seamless loop */}
<div className="mt-16 space-y-6 overflow-hidden relative">
  {/* Row 2 - scroll right */}
  <div className="overflow-hidden">
    <div className="flex gap-12 animate-scroll-right whitespace-nowrap w-[90vw]">
      {[...logoPaths, ...logoPaths].map((logo, index) => (
        <Image
          key={`row2-${index}`}
          src={logo}
          alt={`Company Logo ${index}`}
          width={120}
          height={60}
          className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
        />
      ))}
    </div>
  </div>
</div>

          {/* Animations */}
         <style jsx>{`
  @keyframes scroll-left {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scroll-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  .animate-scroll-left {
    animation: scroll-left 40s linear infinite;
  }

  .animate-scroll-right {
    animation: scroll-right 45s linear infinite;
  }
`}</style>


        </div>
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

function TestimonialCard({ name, role, quote, image, rating }: TestimonialCardProps): JSX.Element {
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white dark:bg-muted/30 flex flex-col h-full transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex items-center mb-4 space-x-4 cursor-pointer">
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm text-muted-foreground italic">
          “{quote}”
        </HoverCardContent>
      </HoverCard>

      <p className="text-sm text-muted-foreground italic mb-4 mt-2">“{quote}”</p>

      <div className="flex space-x-1 mt-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}
          />
        ))}
      </div>
    </div>
  );
}
