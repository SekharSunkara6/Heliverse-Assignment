import mongoose from "mongoose"

const DB_NAME = "heliverse"


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n mongoDB Connected || DB Host: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error: ",error)
        process.exit(1)
    }
}

export default connectDB;