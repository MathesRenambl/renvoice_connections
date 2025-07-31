


// 'use client';
// import InsightsTable from '@/components/tvk/insightsTable';
// import Container from '@/components/ui/container';
// import PageTitle from '@/components/ui/pageTitle';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import data from '@/data/tvk.json';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Clock, Phone, PhoneIncoming, PhoneOutgoing } from 'lucide-react';

// function Page() {
//   const params = useParams();
//   const code = Number(params?.code);

//   const matchedDistrict = data.find((d) => Number(d.code) === code);

//   const [summary, setSummary] = useState({
//     totalNumbers: 0,
//     avgCallDuration: '0.00',
//     totalIncoming: 0,
//     totalOutgoing: 0,
//   });

//   useEffect(() => {
//     if (!matchedDistrict) return;

//     const numbers = matchedDistrict.numbers || [];
//     const totalNumbers = numbers.length;

//     let totalDuration = 0;
//     let totalCalls = 0;
//     let totalIncoming = 0;
//     let totalOutgoing = 0;

//     numbers.forEach((num) => {
//       const logs = num.call_logs || [];
//       totalCalls += logs.length;
//       totalDuration += logs.reduce((sum, log) => sum + log.duration_seconds, 0);
//       totalIncoming += logs.filter((log) => log.call_type === 'incoming').length;
//       totalOutgoing += logs.filter((log) => log.call_type === 'outgoing').length;
//     });

//     const avgCallDuration = totalCalls ? (totalDuration / totalCalls).toFixed(2) : '0.00';

//     setSummary({
//       totalNumbers,
//       avgCallDuration,
//       totalIncoming,
//       totalOutgoing,
//     });
//   }, [matchedDistrict]);

//   return (
//     <Container>
//       <PageTitle title="Constitute Insights" />

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
//          <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Numbers</p>
//                   <p className="text-2xl font-bold text-black">
//                     {summary.totalNumbers}
//                   </p>
//                 </div>
//                 <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
//                   <Phone className="w-4 h-4 mr-2" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Avg Call Duration</p>
//                   <p className="text-2xl font-bold text-black">
//                     {summary.avgCallDuration} sec
//                   </p>
//                 </div>
//                 <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
//                   <Clock className="w-6 h-6 text-gray-800" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
         
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Incoming Calls  </p>
//                   <p className="text-2xl font-bold text-black">
//                     {summary.totalIncoming}
//                   </p>
//                 </div>
//                 <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
//                   <PhoneIncoming className="h-4 w-4 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600"> Outgoing Calls </p>
//                   <p className="text-2xl font-bold text-black">
//                    {summary.totalOutgoing}
//                   </p>
//                 </div>
//                 <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
//                   <PhoneOutgoing className="h-4 w-4 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
       
//       </div>

//       {/* Table */}
//       <InsightsTable code={code} />
//     </Container>
//   );
// }

// export default Page;


'use client';
import InsightsTable from '@/components/tvk/insightsTable';
import Container from '@/components/ui/container';
import PageTitle from '@/components/ui/pageTitle';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import data from '@/data/tvk.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Phone, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { Input } from '@/components/ui/input'; // Import the Input component

function Page() {
  const params = useParams();
  const code = Number(params?.code);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  const matchedDistrict = data.find((d) => Number(d.code) === code);

  const [summary, setSummary] = useState({
    totalNumbers: 0,
    avgCallDuration: '0.00',
    totalIncoming: 0,
    totalOutgoing: 0,
  });

  useEffect(() => {
    if (!matchedDistrict) return;

    const numbers = matchedDistrict.numbers || [];
    const totalNumbers = numbers.length;

    let totalDuration = 0;
    let totalCalls = 0;
    let totalIncoming = 0;
    let totalOutgoing = 0;

    numbers.forEach((num) => {
      const logs = num.call_logs || [];
      totalCalls += logs.length;
      totalDuration += logs.reduce((sum, log) => sum + log.duration_seconds, 0);
      totalIncoming += logs.filter((log) => log.call_type === 'incoming').length;
      totalOutgoing += logs.filter((log) => log.call_type === 'outgoing').length;
    });

    const avgCallDuration = totalCalls ? (totalDuration / totalCalls).toFixed(2) : '0.00';

    setSummary({
      totalNumbers,
      avgCallDuration,
      totalIncoming,
      totalOutgoing,
    });
  }, [matchedDistrict]);

  return (
    <Container>
      <PageTitle title="Constitute Insights" />

      {/* Search Bar - Add this section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search by phone number or booth ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Numbers</p>
                <p className="text-2xl font-bold text-black">
                  {summary.totalNumbers}
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <Phone className="w-4 h-4 mr-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Call Duration</p>
                <p className="text-2xl font-bold text-black">
                  {summary.avgCallDuration} sec
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <Clock className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Incoming Calls</p>
                <p className="text-2xl font-bold text-black">
                  {summary.totalIncoming}
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <PhoneIncoming className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outgoing Calls</p>
                <p className="text-2xl font-bold text-black">
                  {summary.totalOutgoing}
                </p>
              </div>
              <div className="border border-gray-100 p-3 rounded-2xl bg-gray-100">
                <PhoneOutgoing className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table - Pass the searchTerm as a prop */}
      {/* <InsightsTable code={code} searchTerm={searchTerm} /> */}
    </Container>
  );
}

export default Page;
