import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from './db'
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/kirjaudu',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Sähköposti", type: "email" },
            password: { label: "Salasana", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email ||!credentials?.password) {
                return null;
            }

            const existingUser = await db.user.findUnique({
                where: { email: credentials?.email }
            })
            if(!existingUser) {
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password)

            if(!passwordMatch) {
                return null;
            }

            return {
                id: `${existingUser.id}`,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
            }
          }
        })
      ]
}