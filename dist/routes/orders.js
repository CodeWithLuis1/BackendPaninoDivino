import { Router } from "express";
import { body, param, query } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { createOrder, getOrders, getOrderById, addOrderItem, updateOrderItem, deleteOrderItem, confirmOrder, registerPayment, removeOrderItemIngredient, customizeOrderItem } from "../handlers/orders.js";
const orderRouter = Router();
/* -----------------------------------------------------
    Crear un nuevo pedido
----------------------------------------------------- */
orderRouter.post("/", body("id_client").optional().isInt().withMessage("ID de cliente inválido"), handleInputErrors, createOrder);
orderRouter.post("/:id/items", addOrderItem);
// para que el usuario pueda personalizar sus ingredientes se usa este 
orderRouter.post("/orders/:id/items/:id_item/customize", customizeOrderItem);
/* -----------------------------------------------------
   Listar pedidos (opcional por estado)
----------------------------------------------------- */
orderRouter.get("/", query("status")
    .optional()
    .isString()
    .isIn(["open", "pending", "completed", "cancelled"])
    .withMessage("Estado no válido"), handleInputErrors, getOrders);
/* -----------------------------------------------------
    Obtener detalle completo de un pedido
----------------------------------------------------- */
orderRouter.get("/:id", param("id").isInt().withMessage("ID de pedido no válido"), handleInputErrors, getOrderById);
/* -----------------------------------------------------
   Agregar producto al pedido
----------------------------------------------------- */
orderRouter.post("/:id/items", param("id").isInt().withMessage("ID de pedido no válido"), body("id_product").notEmpty().isInt().withMessage("El ID del producto es obligatorio"), body("quantity").optional().isInt({ min: 1 }).withMessage("Cantidad inválida"), handleInputErrors, addOrderItem);
/* -----------------------------------------------------
   Actualizar producto del pedido
----------------------------------------------------- */
orderRouter.patch("/items/:id_item", param("id_item").isInt().withMessage("ID de item no válido"), body("quantity").optional().isInt({ min: 1 }).withMessage("Cantidad inválida"), body("notes").optional().isString().withMessage("Notas inválidas"), handleInputErrors, updateOrderItem);
/* -----------------------------------------------------
   Eliminar producto del pedido
----------------------------------------------------- */
orderRouter.delete("/items/:id_item", param("id_item").isInt().withMessage("ID de item no válido"), handleInputErrors, deleteOrderItem);
/* -----------------------------------------------------
   Confirmar pedido (guardar y pasar a cobro)
----------------------------------------------------- */
orderRouter.post("/:id/confirm", param("id").isInt().withMessage("ID de pedido no válido"), handleInputErrors, confirmOrder);
/* -----------------------------------------------------
   egistrar pago del pedido
----------------------------------------------------- */
orderRouter.post("/:id/payments", param("id").isInt().withMessage("ID de pedido no válido"), body("method")
    .notEmpty()
    .isIn(["cash", "card"])
    .withMessage("Método de pago inválido"), body("amount_cents").notEmpty().isInt({ min: 0 }).withMessage("Monto inválido"), body("tip_cents").optional().isInt({ min: 0 }), body("change_cents").optional().isInt({ min: 0 }), handleInputErrors, registerPayment);
/* -----------------------------------------------------
   Quitar o modificar un ingrediente del item
----------------------------------------------------- */
orderRouter.delete("/:id/items/:id_item/ingredients/:id_ingredient", param("id").isInt(), param("id_item").isInt(), param("id_ingredient").isInt(), handleInputErrors, removeOrderItemIngredient);
export default orderRouter;
//# sourceMappingURL=orders.js.map