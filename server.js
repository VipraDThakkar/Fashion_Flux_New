import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors';
//configure env
dotenv.config();

//databse config
connectDB();

//rest objecty
const app = express();

//middelwares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);



//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});























// const app = express();

// // Correcting the connection string
// mongoose.connect('mongodb+srv://viprathakkar27:VIPRA1234@cluster0.xugbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDB connected");
// }).catch((err) => {
//     console.log("MongoDB connection error:", err);
// });

// // Define User schema and model
// const UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// });

// const UserModel = mongoose.model("users", UserSchema);

// // Define a GET route
// app.get("/getUsers", (req, res) => {
//     UserModel.find({})
//         .then(function(users) {
//             res.json(users);
//         })
//         .catch(function(err) {
//             console.log(err);
//             res.status(500).send("Error fetching users");
//         });
// });

// // Start the server
// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });
