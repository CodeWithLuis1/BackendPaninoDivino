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
import { createDefaultUser } from "./seed/DefaultUser.js";
import authRouter from "./routes/login.js";
import roleRouter from "./routes/role.js";

//conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
     await db.sync({ alter: true });//This ensures that the tables are up to date.
    console.log(colors.bgGreen.white("Successful connection to the database "));
     await createDefaultUser();
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
server.use("/api/user",userRouter);
server.use("/api/auth",authRouter);
server.use("/api/role", roleRouter);
server.use("/api/order", orderRouter);
server.use("/api/contract", contractRouter);
server.use("/api/product", productRouter);
server.use("/api/product/create", productRouter);


export default server;
