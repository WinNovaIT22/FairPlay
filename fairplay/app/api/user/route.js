import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { hash } from "bcrypt";

export async function POST(req) {
    try {
<<<<<<< HEAD
        const body = await req.json();
        const { firstname, lastname, email, password, vehicle } = body;
=======
        const body = await req.json()
        const { firstname, lastname, email, password } = body
>>>>>>> 56a41f8b39fd7a0e9e0717d4fa5fd9faf2345bbc

        // Check if user with the given email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Tällä sähköpostilla on jo rekisteröity"}, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create the user
        const newUser = await db.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role: "käyttäjä",
            }
        });

        // Create the associated vehicle record in UserVehicles table
        const newUserVehicle = await db.userVehicles.create({
            data: {
                user_id: newUser.id, 
                vehicle,
                inspected: false
            }
        });
        console.log("New User Vehicle:", newUserVehicle)

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "Käyttäjä luotu onnistuneesti"}, { status: 201 });
    } catch(error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Jotain meni mönkään"}, { status: 500 });
    }
}