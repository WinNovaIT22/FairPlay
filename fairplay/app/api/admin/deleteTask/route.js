import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { populateOrUpdateUserTasks } from "@/utils/populateUserTasks";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    // Check if the task exists before attempting to delete it
    const task = await db.tasks.findUnique({
      where: { id: id },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Delete the task
    const deleteTask = await db.tasks.delete({
      where: { id: id },
    });

    // Populate or update UserTasks
    await populateOrUpdateUserTasks();

    return NextResponse.json({ task: deleteTask, message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}
