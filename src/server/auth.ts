import { db } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, type NextAuthOptions } from "next-auth";
import { Environments, Pages, Routes } from "@/app/constants/enums";
import { login } from "./_action/auth";
import { JWT } from "next-auth/jwt";
import { User, UserRole } from "@prisma/client";


declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}



export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image as string;
        session.user.country = token.country as string;
        session.user.city = token.city as string;
        session.user.postalCode = token.postalCode as string;
        session.user.streetAddress = token.streetAddress as string;
        session.user.phone = token.phone as string;
      }
      return {
        ...session, user: { ...session.user },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const dbuser = await db.user.findUnique({
        where: {
          email: token?.email as string

        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
          city: true,
          country: true,
          postalCode: true,
          streetAddress: true,
          phone: true,
        }
      })
      if (!dbuser) {
        return token;
      }
      return {
        ...token,
        id: dbuser.id,
        email: dbuser.email,
        name: dbuser.name,
        role: dbuser.role,
        image: dbuser.image,
        city: dbuser.city,
        country: dbuser.country,
        postalCode: dbuser.postalCode,
        streetAddress: dbuser.streetAddress,
        phone: dbuser.phone,
      }
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === Environments.DEV,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await login(credentials as Record<'email' | 'password', string>);
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responseError: res.message,
            })
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`
  }
}