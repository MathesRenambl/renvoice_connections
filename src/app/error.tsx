// app/error.tsx
// "use client";

// export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
//   return (
//     <div className="p-10 text-center">
//       <h2 className="text-red-500 text-xl font-semibold">An unexpected error occurred!</h2>
//       <p className="text-gray-600 mt-2">{error.message}</p>
//       <button
//         onClick={() => reset()}
//         className="mt-4 bg-black text-white px-4 py-2 rounded"
//       >
//         Try Again
//       </button>
//     </div>
//   );
// }


"use client";

import { AlertTriangle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 w-screen">
      <div className="max-w-md mx-auto text-center">
        {/* Error Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-gray-600 animate-pulse" />
          </div>
          {/* Decorative rings */}
          {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 border-2 border-orange-200 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-orange-300 rounded-full animate-ping opacity-30 animation-delay-150"></div> */}
        </div>

        {/* Main Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We encountered an unexpected issue. Don&apos;t worry - our team has been 
            notified and is working to resolve this quickly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          {/* <button
            onClick={() => reset()}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button> */}
          
          <button
            onClick={() =>router.back()}
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
  

        {/* Status Message */}
        <div className="mt-6 text-xs text-gray-500">
          <p>Error ID: {Date.now().toString(36)} • Our team is working on it</p>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <style jsx>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}
