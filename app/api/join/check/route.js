import Attend from "@/models/attend";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userID");
  const roomId = searchParams.get("roomID");

  if (!userId || !roomId) {
    return NextResponse.json({ registered: false });
  }

  const isRegistered = await Attend.exists({ user: userId, room: roomId });
  if (isRegistered) {
    const detail = await Attend.findById(isRegistered._id);
    if (detail.withRole == "owner"){
      return NextResponse.json({ registered: Boolean(isRegistered), owner: true});
    }
    return NextResponse.json({ registered: Boolean(isRegistered), owner: false});
  } else {
    return NextResponse.json({ registered: Boolean(isRegistered), owner: false});
  }
}
