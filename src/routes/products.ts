import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../handlers/products.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

productRouter.post(
  "/",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("id_category").notEmpty().withMessage("La categoría es obligatoria").isInt().withMessage("ID de categoría inválido"),
  handleInputErrors,
  createProduct
);

productRouter.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
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
