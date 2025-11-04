import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { createIngredients, getIngredientsByProduct } from "../handlers/ingredients.js";

const ingredientRouter = Router();

// Obtener ingredientes de un producto
ingredientRouter.get(
  "/:id_product",
  param("id_product").isInt().withMessage("ID de producto no válido"),
  handleInputErrors,
  getIngredientsByProduct
);

// Crear ingredientes asociados a un producto
ingredientRouter.post(
  "/",
  body("id_product").isInt().withMessage("El ID del producto es obligatorio"),
  body("ingredients").isArray({ min: 1 }).withMessage("Debe enviar un arreglo de ingredientes"),
  handleInputErrors,
  createIngredients
);

export default ingredientRouter;
