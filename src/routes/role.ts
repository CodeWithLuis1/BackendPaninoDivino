// routes/role.router.ts
import { Router } from "express";
import { body } from "express-validator";
import { createRole, getRoles } from "../handlers/role.js";
import { handleInputErrors } from "../middleware/index.js";

const roleRouter = Router();

// POST /api/role -> Crear rol
roleRouter.post(
  "/",
  body("name").notEmpty().withMessage("El nombre del rol es obligatorio"),
  handleInputErrors,
  createRole
);

// GET /api/role -> Listar roles
roleRouter.get("/", getRoles);

export default roleRouter;
