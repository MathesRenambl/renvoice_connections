'use client'
import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0; // Reset for demo
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="relative flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-1 h-16">
          {[...Array(20)].map((_, i) => {
            const height = Math.sin((progress + i * 10) * 0.1) * 30 + 35;
            return (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-slate-600 to-slate-800 rounded-full transition-all duration-150 ease-out"
                style={{ 
                  height: `${height}px`
                }}
              />
            );
          })}
        </div>
        {/* <div>Loading...</div> */}
      </div>
      <style>{`
        @keyframes slide-loop {
          0% { 
            transform: translateX(-100px);
            opacity: 0;
          }
          20% {
            transform: translateX(0);
            opacity: 1;
          }
          80% {
            transform: translateX(0);
            opacity: 1;
          }
          100% { 
            transform: translateX(100px);
            opacity: 0;
          }
        }
        
        .animate-slide-in {
          animation: slide-loop 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;