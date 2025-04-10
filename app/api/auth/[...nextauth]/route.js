import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            throw new Error("Don't have an account yet, please sign up.");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid username or password.");
          }

          return user;
        } catch (error) {
          console.log(error);
          throw new Error(error.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2hours
    updateAge: 0,
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongoDB();

      if (account.provider === "google") {
        const existingUser = await User.findOne({ email: profile.email });

        // Save Google user if not already in the DB
        if (!existingUser) {
          await User.create({
            username: profile.name,
            email: profile.email,
            provider: "google",
            role: "user",
          });
        }
        user.id = existingUser._id.toString();
        user.username = existingUser.username;
        user.role = existingUser.role;
      }

      return true; // Allow sign-in
    },

    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.id = user.id;
        token.provider = account.provider;
        token.username = user.username || profile?.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
