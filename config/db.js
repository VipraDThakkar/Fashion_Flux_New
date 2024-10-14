import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
<<<<<<< HEAD
    const constring = "xxxx";
=======
    const constring = "xxx";
>>>>>>> 19ff016d0f0b539808ffd0c18b6e4bab10f17943
    const conn = await mongoose.connect(constring);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
