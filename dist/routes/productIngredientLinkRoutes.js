import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { createMultipleProductIngredientLinks } from "../handlers/createProductIngredientLink.js";
const productIngredientRouter = Router();
productIngredientRouter.post("/", body("product_id")
    .isInt()
    .withMessage("product_id debe ser un número entero"), body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un ingrediente"), body("ingredients.*.ingredient_id")
    .isInt()
    .withMessage("ingredient_id debe ser entero"), body("ingredients.*.ingredient_role")
    .isIn(["base", "extra"])
    .withMessage("ingredient_role debe ser 'base' o 'extra'"), 
// Opcionales con validación segura
body("ingredients.*.is_default_selected").optional().isBoolean(), body("ingredients.*.is_removable").optional().isBoolean(), body("ingredients.*.additional_price").optional().isNumeric(), body("ingredients.*.is_active").optional().isBoolean(), handleInputErrors, createMultipleProductIngredientLinks);
export default productIngredientRouter;
//# sourceMappingURL=productIngredientLinkRoutes.js.map