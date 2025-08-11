// "use client";
// import { getServerSession, Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
// // import { authOptions } from "../lib/authOptions";
// import SessionListener from "@/components/session/sessionListener";

// export default function AuthProvider({ children,session }: { children: React.ReactNode, session?: Session|null  }) {
  
//   return (
//    <SessionProvider session={session} basePath="/nextApi/api/auth">
//     <SessionListener initialSession={session} />
//     {children}
//   </SessionProvider>);
// }

// export async function getServerSideProps(ctx) {
//   const session = await getServerSession(ctx.req, ctx.res, authOptions);
//   return { props: { session } };
// }
