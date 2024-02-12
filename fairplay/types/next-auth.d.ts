import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        firstname: string
    }
    interface Session {
        user: User & {
            firstname: string
            lastname: string
            vehicle: string
        }
        token: {
            firstname: string
            lastname: string
            vehicle: string
        }
    }
}