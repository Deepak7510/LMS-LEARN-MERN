import mongoose from "mongoose";

async function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("Database not connected : ", err);
    });
}

export default connectDB;
