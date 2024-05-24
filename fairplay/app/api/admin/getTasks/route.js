import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get("year");

    if (!year) {
      throw new Error("Year parameter is missing");
    }

    const tasks = await db.tasks.findMany({
      where: {
        year: parseInt(year),
      },
      select: {
        id: true,
        task: true,
        taskdesc: true,
        image: true,
        text: true,
        again: true,
        points: true,
        year: true,
      },
    });

    return NextResponse.json({ task: tasks, message: "Tasks loaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
