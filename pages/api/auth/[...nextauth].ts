import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getToken } from "@/lib/apis/getToken";
import { getUserInfo } from "@/lib/apis/getUserInfo";

type Values = {
  email: string;
  password: string;
};
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
console.log({token});

        if (token) {
          const user = await getUserInfo(token);
          console.log({user});
          
          return user
        }
        
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn callback user:', {profile}, {user}, {account});
      
      return true
    },
    async session({session, token, user}) {
      console.log('session callback', { session });
      return session
    },
  },
};

export default NextAuth(authOptions);
