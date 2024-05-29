import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { taskId, admintext } = body;

    if (!taskId) throw new Error("Invalid task ID");

    const updatedTask = await db.userTasks.update({
      where: { id: taskId },
      data: {
        admintext,
        completed: false,
        checked: false
      }
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Failed to update task inspection:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
