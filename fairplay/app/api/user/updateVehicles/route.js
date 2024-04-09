import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        const { vehicle } = await req.json();

        if (!session) {
            return NextResponse.error(new Error("Unauthorized"), { status: 401 });
        }
      
        const userId = parseInt(session.user.id);
        
        const userVehiclesCount = await db.userVehicles.count({
            where: {
                user_id: userId
            }
        });

        if (userVehiclesCount >= 5) {
            return NextResponse.error(new Error("Maximum number of vehicles reached"), { status: 400 });
        }

        const updatedVehicle = await db.userVehicles.create({
            data: {
                user_id: userId,
                vehicle,
                inspected: false,
            }
        });

        return NextResponse.json({ user: updatedVehicle, message: "User vehicles updated" }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: "Failed to update user vehicles" }, { status: 500 });
    }
}
