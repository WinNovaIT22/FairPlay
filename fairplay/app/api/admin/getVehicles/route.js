import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {  
  try {
    const body = await req.json();
    const { user_id } = body;

    const userVehicles = await db.userVehicles.findMany({
      where: {
        user_id: user_id, 
      },
      select: {
        vehicle: true,
        inspected: true,
        inspectedImage: true,
      }
    });

    return NextResponse.json(userVehicles, { status: 200 });
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    return NextResponse.error(error, { status: 500 });
  }
}