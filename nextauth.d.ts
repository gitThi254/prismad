import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string | undefined;
    } & DefaultSession["user"];
  }
}
