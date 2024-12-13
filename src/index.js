// require("dotenv").config({path:"/.env"});
import dotenv from "dotenv"
import { app } from "./app.js";
import { connectToDb } from './db/index.js'


dotenv.config({
  path: "./.env"
})

connectToDb()
.then(() => {
  app.listen(process.env.PORT || 8000,() => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
})
.catch((error) => {
    console.log("MongoDB connection failed !!!", error)
});

  
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv"; // Ensure dotenv is imported to load env vars
// import { DB_NAME } from "./constants.js";

// dotenv.config(); 

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     console.log("MongoDB connected successfully!");

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to MongoDB or start server:", error);
//     process.exit(1); // Exit on failure
//   }
// })();
