import Attend from "@/models/attend";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  //   const userId = searchParams.get("userID");
  const roomId = searchParams.get("roomID");

  // if (!userId || !roomId) {
  //   return NextResponse.json({ registered: false });
  // }

  const findMember = await Attend.find({ room: roomId })
    .populate("user", "username email")
  
  return NextResponse.json({ data: findMember});
}
