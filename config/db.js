import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const constring = "mongodb+srv://viprathakkar27:VIPRA1234@cluster0.xugbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const conn = await mongoose.connect(constring);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;