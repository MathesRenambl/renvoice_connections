"use client";
import React, { useState } from "react";
import Image from "next/image";

function RelatedPostCard({ post }: { post: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
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
          animation: shineSweep 1.2s ease-out forwards;
        }
      `}</style>

      <a
        href={`/blog/${post.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 relative"
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          {/* Shine effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-2xl">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 ${
                isHovered ? "shine-animation" : ""
              }`}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(255,255,255,0.7), rgba(255,255,255,0.4), transparent)",
                transform: isHovered
                  ? undefined
                  : "translateX(-100%) skewX(12deg)", // Default position before hover
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags?.slice(0, 2).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-white text-black border border-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 ">
            {post.title}
          </h4>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center text-xs text-gray-500">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </a>
    </>
  );
}

export default RelatedPostCard;
