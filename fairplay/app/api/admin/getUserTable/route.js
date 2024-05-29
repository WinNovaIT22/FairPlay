import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req) {
  try {
    const users = await db.user.findMany({
      where: {
        blocked: false,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        tasks: {
          select: {
            completed: true,
            checked: true,
          },
        },
      },
    });
    return NextResponse.json(
      { user: users, message: "Users loaded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
