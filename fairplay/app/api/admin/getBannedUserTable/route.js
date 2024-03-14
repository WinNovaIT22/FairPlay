import { NextResponse } from "next/server";
import { db } from "@/utils/db"

export async function GET(req) {
    try {
        const users = await db.user.findMany({
            where: {
                blocked: true
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true,
            }
        });
        return NextResponse.json({ user: users, message: "Banned users loaded succesfully"}, { status: 201 })
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong"}, { status: 500 })
    }
}
