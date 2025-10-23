import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../handlers/productCategory.js";
const categoryRouter = Router();

// Get all categories
categoryRouter.get("/", getCategories);

// Get category by ID
categoryRouter.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getCategoryById
);

// Create a new category
categoryRouter.post(
  "/",
  body("name").notEmpty().withMessage("El nombre de la categoría es obligatorio"),
  handleInputErrors,
  createCategory
);

// Update a category
categoryRouter.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  handleInputErrors,
  updateCategory
);

// Delete a category
categoryRouter.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteCategory
);

export default categoryRouter;
