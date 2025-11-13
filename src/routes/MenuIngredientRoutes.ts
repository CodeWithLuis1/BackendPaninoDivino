import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import {
  createMenuIngredient,
  getAllMenuIngredients,
} from "../handlers/MenuIngredient.js";

const ingredientRouter = Router();


// Crear ingrediente global
ingredientRouter.post(
  "/",
  body("ingredient_name")
    .notEmpty()
    .withMessage("El nombre del ingrediente es obligatorio"),
  handleInputErrors,
  createMenuIngredient
);

// Obtener todos los ingredientes
ingredientRouter.get("/", getAllMenuIngredients);

export default ingredientRouter;
