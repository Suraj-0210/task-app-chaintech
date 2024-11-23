import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database is Connected");
  } catch (error) {
    console.log("Error happend: ", error.message);
  }
};

export default connectToMongo;
