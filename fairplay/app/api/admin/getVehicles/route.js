import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req) {  
  try {
    const userVehicles = await db.userVehicles.findMany({
      where: {
        vehicle, 
      },
    });

    return NextResponse.json(userVehicles, { status: 200 });
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
