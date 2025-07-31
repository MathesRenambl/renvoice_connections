

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag, Eye, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const blogPosts = [
  {
    slug: "ai-agents-transform-business",
    title: "Why AI Agents Are Transforming the Way Businesses Operate",
    image: "https://renambl.blr1.cdn.digitaloceanspaces.com/renvoice/web/img1.jpeg",
    date: "June 20, 2025",
    readTime: "8 min read",
   
    category: "AI Innovation",
    featured: true,
    summary: `AI agents are revolutionizing business operations through automation and intelligent decision-making. At Renvioce, we develop solutions that enhance productivity and customer experiences.`,
  },
  {
    slug: "ai-customer-support",
    title: "The Rise of Intelligent Automation in Customer Support",
    image: "https://renambl.blr1.cdn.digitaloceanspaces.com/renvoice/web/img2.jpeg",
    date: "June 15, 2025",
    readTime: "6 min read",
    
    category: "Customer Experience",
    featured: false,
    summary: `Transform your customer support with AI agents that handle queries, escalate issues, and learn from interactions - available 24/7 without human involvement.`,
  },
  {
    slug: "scaling-with-ai",
    title: "Scaling with AI: How Smart Agents Help You Grow",
    image: "https://renambl.blr1.cdn.digitaloceanspaces.com/renvoice/web/img3.jpeg",
    date: "June 10, 2025",
    readTime: "7 min read",
   
    category: "Business Growth",
    featured: true,
    summary: `AI agents enable businesses to scale efficiently without adding overhead, making them ideal for companies at any growth stage.`,
  },
  {
    slug: "multilingual-ai-agents",
    title: "Enhancing Multilingual Communication with AI Agents",
    image: "https://renambl.blr1.cdn.digitaloceanspaces.com/renvoice/web/img4.jpeg",
    date: "June 5, 2025",
    readTime: "5 min read",
   
    category: "Global Solutions",
    featured: false,
    summary: `Break language barriers with AI agents that detect and translate conversations in real-time for seamless global communication.`,
  },
];

const CategoryBadge = ({ category, featured }) => (
  <div className="flex items-center gap-2 mb-3">
    <span
      className="px-3 py-1 text-xs font-semibold rounded-full bg-white text-black border-gray-300 border "
    >
      {category}
    </span>
    {featured && (
      <span className="flex items-center  px-3 py-1 text-xs font-semibold rounded-full bg-white text-black border-gray-300 border ">
        <TrendingUp size={12} className="mr-1" />
        Featured
      </span>
    )}
  </div>
);


const BlogCard = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Add the CSS animation styles */}
      <style jsx>{`
        @keyframes shineSweep {
          0% {
            transform: translateX(-100%) skewX(12deg);
          }
          100% {
            transform: translateX(400%) skewX(12deg);
          }
        }
        .shine-animation {
          animation: shineSweep 1.2s ease-out;
        }
      `}</style>
      
      <div
        onClick={() => onClick(post.slug)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 relative"
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
            : 'white'
        }}
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          
          {/* Shine Effect Overlay - Only on Image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-2xl">
            <div 
              className={`absolute top-0 left-0 h-full w-1/2 transform transition-all duration-300 ${
                isHovered ? 'shine-animation' : ''
              }`}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(255,255,255,0.7), rgba(255,255,255,0.4), transparent)',
                transform: isHovered ? 'translateX(-100%) skewX(12deg)' : 'translateX(-150%) skewX(12deg)',
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <CategoryBadge category={post.category} featured={post.featured} />
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 ">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.summary}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
              Read More 
              <ArrowRight size={14} className="ml-2 mt-1 group-hover:ml-2 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function BlogListing() {
  const router = useRouter();

  const handleCardClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div id='blog' className=" bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the latest insights on AI agents, business automation, and digital transformation. Stay ahead with expert analysis and practical guidance.
            </p>
          </div>
        </div>

       

        {/* All Posts Grid */}
        <div className="mb-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} onClick={handleCardClick} />
            ))}
          </div>
        </div>

        
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(12deg);
          }
          100% {
            transform: translateX(300%) rotate(12deg);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}