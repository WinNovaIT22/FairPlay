import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { hash } from "bcrypt";
import { populateOrUpdateUserTasks } from "@/path/to/your/utils"; // Ensure to update the import path

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, password, vehicle } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Tällä sähköpostilla on jo rekisteröity" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: "kilpailija",
      },
    });

    const newUserVehicle = await db.userVehicles.create({
      data: {
        user_id: newUser.id,
        vehicle,
        inspected: false,
      },
    });

    await populateOrUpdateUserTasks(newUser.id);

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, newUserVehicle, message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
