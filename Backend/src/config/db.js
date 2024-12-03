import { connect } from "mongoose";

export async function connectDb() {
  try {
    const connectionInstance = await connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB connected successfuly : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection Error : ", error);
    process.exit(1);
  }
}
