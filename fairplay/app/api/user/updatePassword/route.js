import { NextResponse } from "next/server";
import { db } from "../../../../utils/db"
import { hash } from "bcrypt"

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, oldPassword, newPassword } = body;

        const existingUser = await db.user.findUnique({
            where: { email: email }
        })
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const isPasswordValid = await compare(oldPassword, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid old password" }, { status: 401 });
        }

        const hashedNewPassword = await hash(newPassword, 10);

        await db.user.update({
            where: { email: email },
            data: {
                password: hashedNewPassword
            }
        })

        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
