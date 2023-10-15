import CrendentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypts from "bcryptjs";
import client from "@/libs/prismadb";
import nextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CrendentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const user = await client.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;
        const isMatch = await bcrypts.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role,
        };
      }
      return token;
    },
    async session({ token, session }) {
      session.user.role = token.role;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
