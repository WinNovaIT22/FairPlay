import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { populateOrUpdateUserTasks } from "@/utils/populateUserTasks";

export async function POST(req) {
  try {
    const body = await req.json();
    const { task, taskdesc, image, text, again, points, year } = body;

    const newTaskData = await db.tasks.create({
      data: {
        task: task,
        taskdesc: taskdesc,
        image: Boolean(image),
        text: Boolean(text),
        again: Boolean(again),
        points: parseInt(points, 10),
        year: parseInt(year, 10),
      },
    });

    // Populate or update UserTasks
    await populateOrUpdateUserTasks();

    return NextResponse.json({ tasks: newTaskData, message: "Task created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}
