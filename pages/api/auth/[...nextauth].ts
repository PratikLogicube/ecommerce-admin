import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/'
  },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
      ]
}

export default NextAuth(authOptions)