import { NextResponse } from "next/server";
import { db } from "../../../utils/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, vehicle } = body;

        // Find the user by userId
        let user = await db.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Add the new vehicle to the user's vehicles array
        if (!user.vehicle) {
            user.vehicle = [vehicle];
        } else {
            user.vehicle.push(vehicle);
        }

        // Update the user with the new vehicles array
        user = await db.user.update({
            where: { id: userId },
            data: { vehicles: user.vehicle }
        });

        return NextResponse.json({ user, message: "Vehicle added successfully" }, { status: 201 });
    } catch(error) {
        console.error("Error adding vehicle:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
