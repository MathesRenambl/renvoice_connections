// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string[];
    pageAccess?: string[];
    orgId?: string;
    memberId?: string;
    orgLogo?: string;
    user: {
      /** DefaultSession.user includes name, email, image **/
    } & DefaultSession["user"];
  }

  interface User {
    token?: string;
    role?: string[];
    pageAccess?: string[];
    orgId?: string;
    memberId?: string;
    orgLogo?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string[];
    pageAccess?: string[];
    orgId?: string;
    memberId?: string;
    orgLogo?: string;
  }
}
