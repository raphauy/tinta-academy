import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type DefaultSession, type NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./db"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({     
      ...session,
      user: {
        ...session.user,
        id: user.id,
        //@ts-ignore
        role: user.role,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER || 'http://localhost:3000',
        port: 587,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "default@default.com",
      ... (process.env.NODE_ENV !== "production"
      ? {
          sendVerificationRequest({ url }) {
            console.log("LOGIN LINK", url)
          },
        }
      : {}),
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout"
  }
}
/*
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
*/

export default NextAuth(authOptions);