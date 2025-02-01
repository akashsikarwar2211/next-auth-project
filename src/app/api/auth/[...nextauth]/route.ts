import NextAuth, { DefaultSession, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Extend the DefaultSession type
interface Session extends DefaultSession {
  user: {
    id: string; // Add the id property
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user = session.user || {}; // Initialize user if undefined
      if (user) {
        session.user.id = user.id; // Ensure user is defined
      }
      return session as Session; // Cast to Session type
    },
  },
})

export { handler as GET, handler as POST }
