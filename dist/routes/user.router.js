import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { createUser, getUser, getUserById, updateUser, deleteUser } from "../handlers/user.js";
const userRouter = Router();
userRouter.get("/", getUser);
userRouter.get("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, getUserById);
userRouter.post("/", body("name").notEmpty().withMessage("El nombre es obligatorio"), body("username")
    .notEmpty().withMessage("El usuario no puede ir vacío")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("El usuario solo puede contener letras, números y guiones bajos"), body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/[0-9]/).withMessage("La contraseña debe contener al menos un número")
    .matches(/[@$!%*?&]/).withMessage("La contraseña debe contener al menos un carácter especial (@$!%*?&)"), body("roleId")
    .notEmpty().withMessage("El role_id es obligatorio")
    .isInt().withMessage("role_id debe ser un número"), handleInputErrors, createUser);
userRouter.put("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, updateUser);
userRouter.delete("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, deleteUser);
export default userRouter;
//# sourceMappingURL=user.router.js.map