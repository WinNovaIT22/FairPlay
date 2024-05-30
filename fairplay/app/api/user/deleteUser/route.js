import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { compare } from "bcrypt";

export async function DELETE(req) {
  try {
    const { userId, password } = await req.json();
    const userIdInt = parseInt(userId, 10);

    // Find the user by ID
    const user = await db.user.findUnique({
      where: { id: userIdInt },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify the password
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    await db.userTasks.deleteMany({
      where: { userId: userIdInt },
    });

    await db.user.delete({
      where: { id: userIdInt },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}
