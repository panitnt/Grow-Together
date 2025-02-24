import mongoose, { Schema } from "mongoose";

const attendSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },
        withRole: {
            type: String,
            enum: ["owner", "participant"],
            required: true
        }
    },
    { timestamps: true }
);

const Attend = mongoose.models.Attend || mongoose.model("Attend", attendSchema);
export default Attend;
