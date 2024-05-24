import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { start, end } = await req.json();

    // Convert ISO 8601 strings to Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const existingDateRange = await db.dateRange.findFirst();
    let dateRange;

    if (existingDateRange) {
      dateRange = await db.dateRange.update({
        where: { id: existingDateRange.id },
        data: {
          start: startDate,
          end: endDate,
        },
      });
      return NextResponse.json({ event: dateRange, message: "Event Updated" }, { status: 200 });
    } else {
      dateRange = await db.dateRange.create({
        data: {
          start: startDate,
          end: endDate,
        },
      });
      return NextResponse.json({ event: dateRange, message: "Event Created" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ message: "Error Saving Event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dateRange = await db.dateRange.findFirst();
    return NextResponse.json({ event: dateRange }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ message: "Error Fetching Event" }, { status: 500 });
  }
}
