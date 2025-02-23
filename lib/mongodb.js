import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB.");
            return;
        }

        await mongoose.connect(process.env.MONGO_DB_CLUSTER);
        console.log("Connected to MongoDB successfully.");
        
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}