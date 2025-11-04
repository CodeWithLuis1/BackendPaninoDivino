import express from "express";
import userRouter from "./routes/user.router.js";
import db from "../src/config/db.js";
import colors from "colors";
import cors from "cors";
import { corsConfig } from "./config/cors.js";
import morgan from "morgan";
import { createDefaultUser } from "./seed/DefaultUser.js";
import authRouter from "./routes/login.js";
import roleRouter from "./routes/role.js";
import { createDefaultRoles } from "./seed/DefaultRol.js";
import categoryRouter from "./routes/productCategory.js";
import productRouter from "./routes/products.js";
import orderRouter from "./routes/orders.js";
import ingredientRouter from "./routes/ingredients.js";
import extraIngredientRoutes from "./routes/ExtraIngredientRoutes.js";

//conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync({ alter: true }); //This ensures that the tables are up to date.
    console.log(colors.bgGreen.white("Successful connection to the database "));
    await createDefaultRoles();
    await createDefaultUser();
  } catch (error) {
    console.log(error);
    console.log(
      colors.bgRed.white("There was an error connecting to the database")
    );
  }
}
connectDB();
const server = express();
server.use(cors(corsConfig));

//loggin
server.use(morgan("dev"));
//read form data
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/role", roleRouter);
server.use("/api/category", categoryRouter);
server.use("/api/products", productRouter);
server.use("/api/orders", orderRouter);
server.use("/api/ingredients", ingredientRouter);
server.use("/api/extra-ingredients", extraIngredientRoutes);




export default server;
