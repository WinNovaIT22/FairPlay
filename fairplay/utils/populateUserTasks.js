import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function populateOrUpdateUserTasks() {
  try {
    const tasks = await db.tasks.findMany();
    const users = await db.user.findMany();

    for (const user of users) {
      for (const task of tasks) {
        const existingUserTask = await db.userTasks.findFirst({
          where: {
            userId: user.id,
            taskId: task.id,
          },
        });

        if (existingUserTask) {
          await db.userTasks.update({
            where: {
              id: existingUserTask.id,
            },
            data: {
              tasktitle: task.task,
              taskdesc: task.taskdesc,
              image: task.image,
              text: task.text,
              points: task.points,
              again: task.again,
              year: task.year,
              // Preserve existing values
              completed: existingUserTask.completed,
              checked: existingUserTask.checked,
            },
          });
          console.log(`Updated UserTask for userId: ${user.id}, taskId: ${task.id}`);
        } else {
          await db.userTasks.create({
            data: {
              userId: user.id,
              taskId: task.id,
              tasktitle: task.task,
              taskdesc: task.taskdesc,
              image: task.image,
              text: task.text,
              points: task.points,
              completed: false,
              checked: false,
              again: task.again,
              year: task.year,
            },
          });
          console.log(`Created UserTask for userId: ${user.id}, taskId: ${task.id}`);
        }
      }
    }

    console.log('UserTasks populated or updated successfully.');
  } catch (error) {
    console.error('Error populating or updating UserTasks:', error);
  } finally {
    await db.$disconnect();
  }
}

export async function GET(req) {
  await populateOrUpdateUserTasks();
  return NextResponse.json({ message: 'UserTasks populated or updated successfully.' }, { status: 200 });
}