import Room from "@/models/room";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const { name, type, description, date, person } = await req.json();

    // Basic validation checks
    if (!name || !type) {
      return NextResponse.json(
        { message: "Name and type are required fields." },
        { status: 400 }
      );
    }


    if (!["sharing", "tutor"].includes(type)) {
      return NextResponse.json(
        { message: "Type must be either 'sharing' or 'tutor'." },
        { status: 400 }
      );
    }

    // check if person number is integer
    if (person && !Number.isInteger(person)) {
      return NextResponse.json(
        { message: "Person must be an integer." },
        { status: 400 }
      );
    }
    
    const newRoom = await Room.create({
      name,
      type,
      description,
      date,
      person,
    });

    // Return a success response with the created room data
    return NextResponse.json(
      { message: "Room created successfully", data: newRoom },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error.message);
    return NextResponse.json(
      { message: "Error creating room", error: error.message },
      { status: 500 }
    );
  }
}
