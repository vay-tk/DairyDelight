import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://vaytk001:vaytk001@cluster0.5izk0mj.mongodb.net/dairy-delight");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
