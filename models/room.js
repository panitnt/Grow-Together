import mongoose, {Schema} from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['sharing', 'tutor']
        },
        description: {
            type: String
        },
        date: {
            type: Date
        },
        person: {
            type: Number,
            integer: true
        }
        
    }, 
    {timestamps: true}
)

roomSchema.plugin(AutoIncrement, { inc_field: 'roomID' });

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema)
export default Room