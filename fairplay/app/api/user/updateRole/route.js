import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {
  try {
    const { userId, newRole } = await req.json();

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json(
      { user: updatedUser, message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user role" },
      { status: 500 }
    );
  }
}
