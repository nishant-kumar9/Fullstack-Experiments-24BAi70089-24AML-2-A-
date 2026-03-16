import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/middleware_db')
        .then(() => {console.log('Connected to MongoDB');})
        .catch(err => {console.log('MongoDB connection error:', err);});
}