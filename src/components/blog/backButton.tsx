'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="flex items-center hover:text-blue-600 transition-colors"
    >
      <ArrowLeft size={16} className="mr-2" />
      Back
    </button>
  );
}