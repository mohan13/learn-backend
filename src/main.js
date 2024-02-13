import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
const app = express();

dotenv.config({
  path: "./env",
});

//config
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// mongodb connection

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000} `);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!!", err);
  });
