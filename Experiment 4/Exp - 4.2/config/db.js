import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://atlas-sql-6992dbfe71e9178181919188-0isgoy.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};