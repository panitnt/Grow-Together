import mongoose, {Schema} from "mongoose";
import Room from "./room";

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true,
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