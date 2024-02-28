import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        firstname: string
        lastname: string
        role: string
        email: string
    }
    interface Session {
        user: User & {
            firstname: string
            lastname: string
            role: string
            email: string
        }
        token: {
            firstname: string
            lastname: string
            role: string
            email: string
        }
    }
}