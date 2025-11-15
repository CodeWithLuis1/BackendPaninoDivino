import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductFull,
  getProductIngredients 
} from "../handlers/products.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id/full", getProductFull);

productRouter.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);
productRouter.get(
  "/:id/ingredients",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductIngredients
);

productRouter.post(
  "/",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("id_category")
    .notEmpty().withMessage("La categoría es obligatoria")
    .isInt().withMessage("ID de categoría inválido"),
  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ min: 0 }).withMessage("El precio debe ser un número válido"),
  handleInputErrors,
  createProduct
);


productRouter.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("El precio debe ser un número válido"),
  handleInputErrors,
  updateProduct
);

productRouter.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

export default productRouter;
