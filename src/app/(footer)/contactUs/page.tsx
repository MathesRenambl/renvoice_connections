// "use client";
// import Head from "next/head";
// import { InlineWidget } from "react-calendly";
// export default function Contact() {
//   return (
//     <>
//       <Head>
//         <title>Contact Us</title>
//       </Head>
//       <div className="min-h-screen bg-white text-white p-6 md:p-12">
//         <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
//           {/* Contact Card */}
//           <div className="bg-white text-black rounded-2xl shadow-lg p-6 flex-1 min-w-[300px] max-w-xl">
//             <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
//             <p className="mb-2">We would love to hear from you!</p>
//             <p className="mb-4">
//               If you would like to learn more about Renvoice, please fill out
//               the demo form, and we will be happy to schedule a call with you.
//             </p>
//             <p className="mb-1">For any other queries, mail us at:</p>
//             <p className="font-semibold text-lg text-teal-400">
//               support@renvoice.ai
//             </p>
//           </div>

          

//           {/* Calendly Embed */}
//           <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 min-w-[320px] max-w-2xl">
//             <InlineWidget
//               url="https://calendly.com/subhashini-renambl/30-minute-meeting"
//               styles={{ minWidth: "100%", height: "630px" }}
//             />
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }




"use client";
import Head from "next/head";
import { InlineWidget } from "react-calendly";
export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg p-6 md:p-10">
    {/* Contact Us */}
    <div className="pt-20">
      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-4 text-muted-foreground max-w-xs leading-relaxed">
        If you would like to learn more about Renvoice, please fill out
         the form or schedule a call, and we will be happy to talk with you.
      </p>
      <p>For any other queries, mail us at:</p>
      <p className="text-primary mb-4 font-semibold">support@renvoice.ai</p>

    </div>

    {/* Calendly Embed */}
    <div className="w-full h-[600px]">
      <iframe
        src="https://calendly.com/subhashini-renambl/30-minute-meeting" // replace with actual
        className="w-full h-full rounded-md border"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
</div>
    </>
  );
}
