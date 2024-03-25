import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { task, taskdesc, image, text, again, points } = body;

    const currentYear = new Date().getFullYear();

    const newTaskData = await db.tasks.create({
      data: {
        task,
        taskdesc,
        image,
        text,
        again,
        points,
        year: currentYear,
      },
    });

    return NextResponse.json(
      { task: newTaskData, message: "Task created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating task" },
      { status: 500 }
    );
  }
}
