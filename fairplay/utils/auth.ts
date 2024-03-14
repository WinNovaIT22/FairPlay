import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from './db'
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/kirjaudu',
    },
    providers: [
        CredentialsProvider({
            id: "username-login",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
            
                const user = await db.user.findUnique({
                    where: { email: credentials?.email }
                });
                if (!user) {
                    return null;
                }
                
                if (user.blocked) {
                    return null; 
                }
            
                const passwordMatch = await compare(credentials.password, user.password);
            
                if (!passwordMatch) {
                    return null;
                }
            
                return {
                    id: `${user.id}`,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    email: user.email,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    email: user.email,
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    firstname: token.firstname,
                    lastname: token.lastname,
                    role: token.role,
                    email: token.email,
                }
            }
        },
    }
};