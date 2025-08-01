'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SearchX, ArrowLeft, FileX, Database } from 'lucide-react';

export default function DataNotFound({
  title = 'No Data Found',
  message = 'We couldnt find what you were looking for.',
  showBackButton = false,
  Icon = Database,
}: {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  Icon?:React.ComponentType<any>;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <Icon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {showBackButton && (
        <Button 
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      )}
    </div>
  );
}