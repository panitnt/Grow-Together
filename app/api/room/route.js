
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Room from "@/models/room";

export async function GET() {
  try {
    await connectMongoDB();

    const rooms = await Room.find({});

    return NextResponse.json(
      { message: "Rooms fetched successfully", data: rooms },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    return NextResponse.json(
      { message: "Error fetching rooms", error: error.message },
      { status: 500 }
    );
  }
}
