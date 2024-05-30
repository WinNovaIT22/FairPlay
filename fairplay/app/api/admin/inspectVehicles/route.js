import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { vehicleId, inspected } = await req.json();

    if (!vehicleId) {
      return NextResponse.json(
        { message: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const existingVehicle = await db.userVehicles.findFirst({
      where: { id: vehicleId },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    const updatedVehicle = await db.userVehicles.update({
      where: { id: vehicleId },
      data: { inspected },
    });

    return NextResponse.json(
      {
        vehicle: updatedVehicle,
        message: "Vehicle inspection status updated successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating vehicle inspection status:", error);
    return NextResponse.json(
      { message: "Failed to update vehicle inspection status" },
      { status: 500 }
    );
  }
}
