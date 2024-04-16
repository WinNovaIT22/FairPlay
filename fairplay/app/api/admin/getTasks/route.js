import { NextResponse } from "next/server";
import { db } from "@/utils/db"

export async function GET(req) {
    try {
        const users = await db.tasks.findMany({
            select: {
                task: true,
                taskdesc: true,
                image: true,
                text: true,
                again: true,
                points: true
            }
        });
        return NextResponse.json({ user: users, message: "Tasks loaded succesfully"}, { status: 201 })
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong"}, { status: 500 })
    }
}
