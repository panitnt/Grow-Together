import Attend from "@/models/attend";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectMongoDB();

  try {
    const { userId, roomId } = await req.json();

    if (!userId || !roomId) {
      return NextResponse.json(
        { message: "Missing userId or roomId" },
        { status: 400 }
      );
    }

    const deleted = await Attend.findOneAndDelete({ user: userId, room: roomId });

    if (!deleted) {
      return NextResponse.json(
        { message: "No attendance found to cancel." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Attendance cancelled successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error cancelling attendance", error: error.message },
      { status: 500 }
    );
  }
}
