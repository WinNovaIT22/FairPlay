import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req) {
    console.log("Request query parameters:", req.query); // Log query parameters
    const { year } = req.query; // Extract year from query parameters
    if (!year) throw new Error("Year parameter is missing");

    try {
        const tasks = await db.tasks.findMany({
            where: {
                year: parseInt(year), // Ensure year is parsed as integer
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
        return NextResponse.json({ task: tasks, message: "Tasks loaded successfully"}, { status: 200 });
    } catch(error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
    }
}