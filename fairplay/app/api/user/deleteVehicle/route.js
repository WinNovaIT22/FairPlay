import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    const { vehicleId } = await req.json();

    if (!session) {
      return NextResponse.error(new Error("Unauthorized"), { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Check if the vehicle belongs to the user
    const vehicle = await db.userVehicles.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle || vehicle.user_id !== userId) {
      return NextResponse.error(
        new Error("Vehicle not found or not owned by user"),
        { status: 404 }
      );
    }

    // Delete the vehicle
    await db.userVehicles.delete({
      where: {
        id: vehicleId,
      },
    });

    return NextResponse.json(
      { message: "Vehicle deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { message: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
