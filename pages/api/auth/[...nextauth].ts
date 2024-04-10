import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/'
  },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({user, account});
      
      return true
    },
    jwt: async ({ token, trigger, session, user, account, profile }) => {
			// if (account?.provider === "google") {
			// 	const googleProfile = profile as GoogleAccountBody;
			// 	const body: GoogleAccountBody = {
			// 		email: googleProfile?.email,
			// 		given_name: googleProfile?.given_name,
			// 		key: process.env.JWT_KEY as string,
			// 		name: googleProfile?.name,
			// 		picture: googleProfile?.picture,
			// 	};
			// 	console.log("=================authOptions========================");
			// 	console.log({ body });
			// 	console.log("======================================================");
			// 	const users = await prisma.users.findUnique({
			// 		where: {
			// 			emailAddress: body.email,
			// 		},
			// 		select: {
			// 			userID: true,
			// 			userRole: true,
			// 			userFirstName: true,
			// 			userLastName: true,
			// 			userPhoneNumber: true,
			// 			emailAddress: true,
			// 			userProfileImageURL: true,
			// 		},
			// 	});
			// 	if (users) {
			// 		const authUser: nextAuthUser = {
			// 			id: users.userID,
			// 			role: users.userRole as any,
			// 			orgID:
			// 				users.userRole?.includes("ADMIN") ||
			// 				users.userRole?.includes("MANAGER")
			// 					? users.userID
			// 					: "EMPTY STRING",
			// 			userLastName: users.userLastName,
			// 			userPhoneNumber: users.userPhoneNumber,
			// 			name: users.userFirstName,
			// 			image: users.userProfileImageURL,
			// 			email: users.emailAddress,
			// 		};
			// 		return { ...token, ...authUser };
			// 	}
			// 	const user = await prisma.users.create({
			// 		data: {
			// 			emailAddress: body.email,
			// 			userFirstName: body.given_name,
			// 			userLastName: body.name,
			// 			userRole: "SUPER_ADMIN",
			// 			userProfileImageURL: body.picture,
			// 			userPhoneNumber: "",
			// 			userPassword: hashPassword(body.email),
			// 		},
			// 		select: {
			// 			userID: true,
			// 			userRole: true,
			// 			userFirstName: true,
			// 			userLastName: true,
			// 			userPhoneNumber: true,
			// 			emailAddress: true,
			// 			userProfileImageURL: true,
			// 		},
			// 	});
			// 	const authUser: nextAuthUser = {
			// 		id: user.userID,
			// 		role: user.userRole as any,
			// 		orgID:
			// 			user.userRole?.includes("ADMIN") ||
			// 			user.userRole?.includes("MANAGER")
			// 				? user.userID
			// 				: "EMPTY STRING",
			// 		userLastName: user.userLastName,
			// 		userPhoneNumber: user.userPhoneNumber,
			// 		name: user.userFirstName,
			// 		image: user.userProfileImageURL,
			// 		email: user.emailAddress,
			// 	};
			// 	return { ...token, ...authUser };
			// }
			// if (trigger === "update") {
			// 	return { ...token, ...session.user };
			// }
			// if (user) return { ...token, ...user };
			console.log({account});
      
      return token;
		},
    }
}

export default NextAuth(authOptions)