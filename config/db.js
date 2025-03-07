import mongoose from "mongoose";
const connectDB = async(uri)=>{
    try {
        const conc = await mongoose.connect(uri, {dbName: 'assessment'});
        console.log(`db is connected to ${conc.connection.host}`);
    } catch (error) {
        console.log('Database connection failed', error.message);
        process.exit(1)
    }
}

export default connectDB;