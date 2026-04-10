
import mongoose from "mongoose";


async function connectMongoDB():Promise<void>{
   try {
    const uri = "mongodb://localhost:27017/attendance_app_db"
    const urii = `mongodb+srv://saurabhkushwaha9889:${encodeURIComponent("Saurabh@9889")}@cluster0.rse4qyj.mongodb.net/knovator_db`;
    await mongoose.connect(uri);

    console.log("Connected to MongoDB successfully", mongoose.connection.name);
   } catch (error) {
    console.error("Error connecting to MongoDB:", error); 
   }
}

export default connectMongoDB;

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));


process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
})