import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getToken } from "@/lib/apis/getToken";
import { getUserInfo } from "@/lib/apis/getUserInfo";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      id: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const token = await getToken(credentials);

        if (token) {
          const user = await getUserInfo(token);
          
          return { ...user, image: user.avatar };
        } 
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return (account?.type === "credentials" && user) ? true : false;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
