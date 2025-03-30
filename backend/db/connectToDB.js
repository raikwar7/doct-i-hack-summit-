import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("connect to db successfully");
  } catch (error) {
    console.log("Error to connect to db");
  }

}

export default connectToDB;
