import mongoose, {Schema} from "mongoose";

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
    }, 
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User