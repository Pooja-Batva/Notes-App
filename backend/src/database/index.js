import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DATABASE CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("DATABASE IS NOT ABLE TO CONNECT..");
        process.exit(1);
    }
}


export default connectDB;