// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//    session: {
//     strategy: "jwt",
//     maxAge: 7 * 24 * 60 * 60,  
//     updateAge: 24 * 60 * 60,
//   },
//   jwt: {
//     maxAge: 7 * 24 * 60 * 60,  
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: { memberEmail: { type: "email" }, memberPassword: { type: "password" } },
//       async authorize(creds) {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             memberEmail: creds?.memberEmail,
//             memberPassword: creds?.memberPassword,
//           }),
//         });
       
//         const data = await res.json();
//         return res.ok && data.token
//           ? {
//               ...data
//             }
//           : null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         Object.assign(token, {
//           accessToken: user.token,
//           role: user.role,
//           pageAccess: user.pageAccess,
//           orgId: user.orgId,
//           orgLogo: user.orgLogo,
//           memberId:user.memberId
//         });
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       Object.assign(session, {
//         accessToken: token.accessToken,
//         role: token.role,
//         pageAccess: token.pageAccess,
//         orgId: token.orgId,
//         orgLogo: token.orgLogo,
//         memberId:token.memberId
//       });
//       return session;
//     },
//   },
//   pages: { signIn: "/" },
//   secret: process.env.NEXTAUTH_SECRET,
// };


import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
  id: string;
  memberEmail: string;
  password: string;
  role: string[];
  pageAccess: string[];
  orgId: string;
  orgLogo: string;
  memberId: string;
  token:string
};

const users: User[] = [
  {
    id: "1",
    memberEmail: "admin@gmail.com",
    password: "1234567890",
    role: ["admin"],
    pageAccess: [
      "dashboard",
      "campaign",
      "bot-agents",
      "human-agents",
      "teamManagement",
      "payment-usage",
      "payments",
      "profile",
      "analytics",
      "settings",
      "callData",
      "call-history",
      "agentCallLog",
      "agentCallHistory",
      "agentNumber",
    ],
    orgId: "1234567890",
    orgLogo:
      "https://www.casagrand.co.in/wp-content/uploads/2021/07/Casagrand-Logo1.png",
    memberId: "a2293765-b310-44d5-a8a5-fd765c09c730",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMjI5Mzc2NS1iMzEwLTQ0ZDUtYThhNS1mZDc2NWMwOWM3MzAiLCJ1c2VybmFtZSI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImFjY2Vzc190eXBlIjoiRVhURVJOQUwiLCJleHAiOjE3NTMyNzY2MTF9.vqM_pGQTtnjWrtgdfGnt146ighKtvOfuqIvS_G5aa4Y"
  },
  {
    id: "2",
    memberEmail: "tvk@gmail.com",
    password: "1234567890",
    role: ["member"],
    pageAccess: [
      "operationTvk/dashboard",
      "operationTvk",
      "campaign",
      "profile",
      "teamManagement",
      "payment-usage",
      "payments",
    ],
    orgId: "5234567890",
    orgLogo: "https://i.postimg.cc/MpMN6kqp/download.png",
    memberId: "a2293765-b310-44d5-a8a5-fd765c09c730",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMjI5Mzc2NS1iMzEwLTQ0ZDUtYThhNS1mZDc2NWMwOWM3MzAiLCJ1c2VybmFtZSI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImFjY2Vzc190eXBlIjoiRVhURVJOQUwiLCJleHAiOjE3NTMyNzY2MTF9.vqM_pGQTtnjWrtgdfGnt146ighKtvOfuqIvS_G5aa4Y"

  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        memberEmail: { label: "Email", type: "email" },
        memberPassword: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds) return null;
        const user = users.find(
          (u) =>
            u.memberEmail === creds.memberEmail &&
            u.password === creds.memberPassword
        );
        if(!user){
         throw new Error("Invalid email or password");
        }
        if (user) {
          const { password, ...rest } = user;
          return rest;
        }
          return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const {
          token: accessToken,
          role,
          pageAccess,
          orgId,
          orgLogo,
          memberId,
        } = user as Partial<User>;
        Object.assign(token, {
          accessToken,
          role,
          pageAccess,
          orgId,
          orgLogo,
          memberId,
        });
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, {
        accessToken: token.accessToken,
        role: token.role,
        pageAccess: token.pageAccess,
        orgId: token.orgId,
        orgLogo: token.orgLogo,
        memberId: token.memberId,
      });
      return session;
    },
  },
  pages: {
    error:"/nextApi/api/auth/error",
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
