import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { start, end } = await req.json();

    // Validate received values
    if (!start || !end) {
      throw new Error("Invalid date format");
    }

    const existingDateRange = await db.dateRange.findFirst();
    let dateRange;

    if (existingDateRange) {
      dateRange = await db.dateRange.update({
        where: { id: existingDateRange.id },
        data: {
          start,
          end,
        },
      });
      return NextResponse.json({ event: dateRange, message: "Event Updated" }, { status: 200 });
    } else {
      dateRange = await db.dateRange.create({
        data: {
          start,
          end,
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
