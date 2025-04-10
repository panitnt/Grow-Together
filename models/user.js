import mongoose, {Schema} from "mongoose";
import Room from "./room";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        provider: { 
            type: String, 
            default: "credentials" 
        },
    }, 
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User