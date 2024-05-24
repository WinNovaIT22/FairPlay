import { db } from "@/utils/db";
import { NextResponse } from "next/server";

async function populateOrUpdateUserTasks() {
  try {
    // Fetch all tasks
    const tasks = await db.tasks.findMany();
    
    // Fetch all users
    const users = await db.user.findMany();
    
    // Iterate through each user and task to populate or update UserTasks
    for (const user of users) {
      for (const task of tasks) {
        // Check if the user-task combination already exists
        const existingUserTask = await db.userTasks.findFirst({
          where: {
            userId: user.id,
            taskId: task.id,
          },
        });

        if (existingUserTask) {
          // If the user-task combination exists, update it
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
              // If you want to update 'completed' or 'admintext', handle it appropriately
              // completed: false, // Update this field if needed
              // admintext: 'Updated by system', // Example of updating admintext
            },
          });
          console.log(`Updated UserTask for userId: ${user.id}, taskId: ${task.id}`);
        } else {
          // If the user-task combination does not exist, create it
          await db.userTasks.create({
            data: {
              userId: user.id,
              taskId: task.id,
              tasktitle: task.task,
              taskdesc: task.taskdesc,
              image: task.image,
              text: task.text,
              points: task.points,
            //   completed: false,
            //   checked: false,
              again: task.again,
              year: task.year,
            },
          });
          console.log(`Created UserTask for userId: ${user.id}, taskId: ${task.id}`);
        }
      }
    }

    console.log('UserTasks populated or updated successfully.');
    NextResponse.json({ message: 'UserTasks populated or updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error populating or updating UserTasks:', error);
    NextResponse.json({ message: 'Error populating or updating UserTasks.' }, { status: 200 });
  } finally {
    await db.$disconnect();
  }
}

export async function GET(req, res) {
  await populateOrUpdateUserTasks();
  NextResponse.json({ message: 'UserTasks populated or updated successfully.' }, { status: 200 });
}
