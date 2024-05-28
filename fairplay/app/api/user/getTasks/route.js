import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const currentYear = new Date().getFullYear();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);

    const userVehicles = await db.userVehicles.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        vehicle: true,
        inspected: true,
      },
    });

    const tasks = await db.userTasks.findMany({
      where: {
        year: currentYear,
        userId: userId,
      },
      select: {
        id: true,
        tasktitle: true,
        taskdesc: true,
        image: true,
        text: true,
        again: true,
        completed: true,
        points: true,
      },
    });

    if (!tasks) {
      return NextResponse.json(
        { message: "No tasks found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { task: tasks, vehicles: userVehicles, message: "Tasks loaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
