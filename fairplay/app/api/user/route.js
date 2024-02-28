import { NextResponse } from "next/server";
import { db } from "@/utils/db"
import { hash } from "bcrypt"

export async function POST(req) {
    try {
        const body = await req.json()
        const { firstname, lastname, email, password } = body

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        })
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Tällä sähköpostilla on jo rekisteröity"}, { status: 409 })
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role: "käyttäjä",
            }
        })
        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({ user: rest, message: "Käyttäjä luotu onnistuneesti"}, { status: 201 })
    } catch(error) {
        return NextResponse.json({ message: "Jotain meni mönkään"}, { status: 500 })
    }
}
