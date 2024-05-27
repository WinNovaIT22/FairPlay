import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { populateOrUpdateUserTasks } from "@/utils/populateUserTasks";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, task, taskdesc, image, text, again, points, year } = body;

    const updatedTaskData = await db.tasks.update({
      where: { id: parseInt(id, 10) },
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

    return NextResponse.json({ tasks: updatedTaskData, message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}
