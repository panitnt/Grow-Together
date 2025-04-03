import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Room from "@/models/room";

// GET a single room by ID
export async function GET(request, context) {
  try {
    await connectMongoDB();

    const { id } = await context.params; 

    if (!id) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 }
      );
    }

    const room = await Room.findById(id); // Find room by ID

    if (!room) {
      return NextResponse.json(
        { message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Room fetched successfully", data: room },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching room:", error.message);
    return NextResponse.json(
      { message: "Error fetching room", error: error.message },
      { status: 500 }
    );
  }
}
