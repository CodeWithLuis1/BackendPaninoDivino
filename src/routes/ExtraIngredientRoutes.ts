import express from "express";
import {
  createExtraIngredient,
  getExtraIngredients,
  assignExtrasToProduct,
  getExtrasByProduct,
} from "../handlers/ExtraIngredient.js";

const router = express.Router();

// CRUD básico de ingredientes extra
router.post("/", createExtraIngredient);
router.get("/", getExtraIngredients);

// Relación con productos
router.post("/assign", assignExtrasToProduct);
router.get("/product/:id_product", getExtrasByProduct);

export default router;
