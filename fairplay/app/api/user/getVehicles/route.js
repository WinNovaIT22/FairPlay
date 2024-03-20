import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function GET(req) {  
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.error(new Error("Unauthorized"), { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const userVehicles = await db.userVehicles.findMany({
      where: {
        user_id: userId, 
      },
    });

    return NextResponse.json(userVehicles, { status: 200 });
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
