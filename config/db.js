import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const constring = "xxx";
    const conn = await mongoose.connect(constring);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;