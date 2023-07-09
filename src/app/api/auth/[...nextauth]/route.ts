import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";
const LOGIN_URL = `${NEXTAUTH_URL}/api/auth/login`;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
  
          const user = await res.json();
          if (user) return user;
          else return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
