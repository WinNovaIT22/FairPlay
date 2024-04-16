import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {
  try {    
    const task = form.get('task');
    const taskdesc = form.get('taskdesc');
    const image = form.get('image');
    const text = form.get('text');
    const again = form.get('again');
    const points = form.get('points');

    const currentYear = new Date().getFullYear();

    const newTaskData = await db.tasks.create({
      data: {
        task: task,
        taskdesc: taskdesc,
        image: image,
        text: text,
        again: again,
        points: points,  
        year: currentYear,
      },
    });

    return NextResponse.json(
      { task: newTaskData, message: "Task created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating task" },
      { status: 500 }
    );
  }
}
