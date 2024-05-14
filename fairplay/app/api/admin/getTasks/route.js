import { NextResponse } from "next/server";
import { db } from "@/utils/db"

export async function GET(req) {
    const { year } = body;
    if (!year) throw new Error("Something went wrong");

    try {
        const tasks = await db.tasks.findMany({
            where: {
                year: year, 
            },
            select: {
                id: true,
                task: true,
                taskdesc: true,
                image: true,
                text: true,
                again: true,
                points: true,
                year: true
            }
        });
        return NextResponse.json({ task: tasks, message: "Tasks loaded succesfully"}, { status: 201 })
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong"}, { status: 500 })
    }
}