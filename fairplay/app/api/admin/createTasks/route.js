import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { task, taskdesc, image, text, again, points, year } = body;

    const newTaskData = await db.tasks.create({
      data: {
        task: task,
        taskdesc: taskdesc,
        image: image,
        text: text,
        again: again,
        points: points,  
        year: year,
      },
    });

    return NextResponse.json({ tasks: newTaskData, message: "Task created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}

export async function POST_delete(req) {
  try {
    const body = await req.json();
    const { task, taskdesc, image, text, again, points, year } = body;

    const newTaskData = await db.tasks.create({
      data: {
        task: task,
        taskdesc: taskdesc,
        image: image,
        text: text,
        again: again,
        points: points,
        year: year,
      },
    });

    return NextResponse.json({ tasks: newTaskData, message: "Task created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}
