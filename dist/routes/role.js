// routes/role.router.ts
import { Router } from "express";
import { body, param } from "express-validator"; // Se agrega 'param' para validar el ID en las rutas PUT y DELETE
import { createRole, getRoles, updateRole, // Se agrega el handler de actualización
deleteRole, // Se agrega el handler de eliminación
 } from "../handlers/role.js";
import { handleInputErrors } from "../middleware/index.js";
const roleRouter = Router();
// POST /api/role -> Crear rol
roleRouter.post("/", body("name").notEmpty().withMessage("El nombre del rol es obligatorio"), handleInputErrors, createRole);
// GET /api/role -> Listar roles
roleRouter.get("/", getRoles);
// PUT /api/role/:id -> Actualizar rol
roleRouter.put("/:id", 
// Opcional: Validación para asegurarse de que el ID es un parámetro válido
param("id").isString().withMessage("El ID del rol es obligatorio"), 
// Opcional: Validación para el nombre en la actualización
body("name").optional().notEmpty().withMessage("El nombre del rol es obligatorio"), handleInputErrors, updateRole);
// DELETE /api/role/:id -> Eliminar rol
roleRouter.delete("/:id", 
// Opcional: Validación para asegurarse de que el ID es un parámetro válido
param("id").isString().withMessage("El ID del rol es obligatorio"), handleInputErrors, deleteRole);
export default roleRouter;
//# sourceMappingURL=role.js.map