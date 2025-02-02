import mongoose from "mongoose";

export const connectMongoDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_DB_CLUSTER)
        console.log("Already Connect mongoDB");
        
    } catch (error) {
        console.log(error);
        
    }
}