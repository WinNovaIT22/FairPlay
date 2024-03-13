import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req) {  
  try {
    const { userId } = await req.json(); 

    const userVehicles = await db.userVehicle.findMany({
      where: {
        userId: parseInt(userId), 
      },
    });
  
    return NextResponse.json(userVehicles, {status: 200 });
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}