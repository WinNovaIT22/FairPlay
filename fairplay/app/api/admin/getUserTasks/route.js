import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {  
    try {
        const body = await req.json();
        const { user_id } = body;
        if (!user_id) throw new Error("Invalid user ID");

        const userTasks = await db.userTasks.findMany({
            where: { userId: user_id, completed: true },
            select: { id: true, tasktitle: true, points: true, image: true, text: true, completed: true, taskdesc: true, textInput: true, imageFile: true, checked: true }
        });

        return NextResponse.json(userTasks, { status: 200 });
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        return NextResponse.json({ error: "Error fetching user tasks" }, { status: 500 });
    }
}
