import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {  
    try {
        const body = await req.json();
        const { user_id } = body;
        if (!user_id) throw new Error("Invalid user ID");

        const userVehicles = await db.userVehicles.findMany({
            where: { user_id: user_id },
            select: { vehicle: true, inspected: true, inspectedImage: true, createdAt: true }
        });

        return NextResponse.json(userVehicles, { status: 200 });
    } catch (error) {
        console.error('Error fetching user vehicles:', error);
        return NextResponse.error({ status: 500, statusText: "Internal Server Error", body: "Error fetching user vehicles" });
    }
}
