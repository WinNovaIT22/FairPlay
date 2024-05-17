import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { vehicleId, inspected } = body;

    if (typeof inspected !== "boolean") {
      throw new Error("Invalid inspection status");
    }

    // Update the inspected status of the vehicle
    await db.userVehicles.update({
      where: { id: vehicleId },
      data: { inspected: inspected },
    });

    return NextResponse.json({ message: "Vehicle inspection status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating vehicle inspection status:", error);
    return NextResponse.error({ status: 500, body: "Error updating vehicle inspection status" });
  }
}
