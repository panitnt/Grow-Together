import Attend from "@/models/attend";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Create an attendance record
// const createAttendance = async () => {
export async function POST(req) {
    await connectMongoDB()
    const { user, room, role = "participant" } = await req.json();

    try {
        const newAttendance = await Attend.create({
            user: user,
            room: room,
            withRole: role
        });

        // console.log("Attendance created successfully:", newAttendance);
        return NextResponse.json(
            { message: "Attendance created successfully:", attend: newAttendance},
            { status: 201 }
        )
    } catch (error) {
        // console.error("Error creating attendance:", error.message);
        return NextResponse.json(
            { message: "Error creating attendance:", error: error.message },
            { status: 500 }
          );
    }
};