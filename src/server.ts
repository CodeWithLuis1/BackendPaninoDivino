import express from "express";
import userRouter from "./routes/user.router.js";
import orderRouter from "./routes/order.router.js"
import contractRouter from "./routes/contract.router.js";
import db from "../src/config/db.js";
import colors from 'colors'
import cors from 'cors'
import { corsConfig } from "./config/cors.js";
import morgan from "morgan";
import productRouter from "./routes/products.router.js"

//conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen.white("Successful connection to the database "));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white("There was an error connecting to the database"));
  }
}
connectDB();
const server = express();
server.use(cors(corsConfig));

//loggin
server.use(morgan('dev'))
//read form data
server.use(express.json())

//All the changes we make here will affect the links we have in the router file
server.use("/api/user", userRouter);
server.use("/api/order", orderRouter);
server.use("/api/contract", contractRouter);
server.use("/api/product", productRouter);
server.use("/api/product/create", productRouter);



export default server;
