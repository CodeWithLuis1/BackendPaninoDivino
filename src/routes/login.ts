// routes/auth.ts
import { Router } from "express";
import { body } from "express-validator";
import { login } from "../handlers/login.js";
import { handleInputErrors } from "../middleware/index.js";

const authRouter = Router();

authRouter.post(
  "/login",
  body("username").notEmpty().withMessage("El usuario es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  login
);

export default authRouter;
