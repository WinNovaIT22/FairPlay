import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: int
        firstname: string
        lastname: string
        role: string
        email: string
    }
    interface Session {
        user: User & {
            id: int
            firstname: string
            lastname: string
            role: string
            email: string
        }
        token: {
            id: int
            firstname: string
            lastname: string
            role: string
            email: string
        }
    }
}