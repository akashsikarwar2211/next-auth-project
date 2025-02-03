import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Authorization logic here
        return null; // Placeholder
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/signin?error=Callback', // Error handling
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl; // Redirect to base URL after sign-in
    },
  },
};
