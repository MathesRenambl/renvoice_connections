import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test</h1>
        <p className="text-gray-700 mb-4">
          If you can see this page styled with blue heading, gray text, white background, and rounded corners, 
          then Tailwind CSS is working correctly!
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-500 text-white p-4 rounded">Red Box</div>
          <div className="bg-green-500 text-white p-4 rounded">Green Box</div>
          <div className="bg-blue-500 text-white p-4 rounded">Blue Box</div>
          <div className="bg-yellow-500 text-white p-4 rounded">Yellow Box</div>
        </div>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
