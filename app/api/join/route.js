import Attend from "./attend";
import User from "./user";
import Room from "./room";
import { connectMongoDB } from "@/lib/mongodb";

// Create an attendance record
// const createAttendance = async () => {
export async function POST(req) {
    await connectMongoDB()
    const { userId, roomId, role = "participant" } = await req.json();

    try {
        const newAttendance = await Attend.create({
            user: userId,
            room: roomId,
            withRole: role
        });

        console.log("Attendance created successfully:", newAttendance);
    } catch (error) {
        console.error("Error creating attendance:", error.message);
    }
};