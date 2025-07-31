'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router=useRouter();
  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 w-screen">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-black text-black/10 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold text-black animate-pulse">
              4
              <span className="inline-block animate-bounce delay-100">0</span>
              <span className="inline-block animate-bounce delay-200">4</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-10">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have wandered off into the digital void. 
              Don&apos;t worry, it happens to the best of us!
            </p>
          </div>

          {/* Decorative Element */}
          <div className="flex justify-center py-4">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-black to-transparent rounded-full"></div>
          </div>

          {/* Suggestions */}
          {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">
              Here's what you can do:
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                  <Home size={16} className="text-black" />
                </div>
                <span>Go back home</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                  <ArrowLeft size={16} className="text-black" />
                </div>
                <span>Check the URL</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                  <Search size={16} className="text-black" />
                </div>
                <span>Try searching</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button 
              className="bg-black hover:bg-black/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <Home size={18} />
              <span>Go Home</span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </Button>
        </div>

        {/* Footer Message */}
        {/* <div className="mt-12 text-sm text-gray-500">
          <p>
            Lost? Our{' '}
            <Link href="/contact" className="text-black hover:underline font-medium">
              support team
            </Link>{' '}
            is here to help you find your way.
          </p>
        </div> */}
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}