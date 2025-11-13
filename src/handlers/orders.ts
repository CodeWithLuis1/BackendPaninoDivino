// // handlers/orders.ts
// import { Request, Response } from "express";
// import { Op } from "sequelize";
// import Order from "../models/Order.model.js";
// import Client from "../models/Client.model.js";
// import OrderItem from "../models/OrderItem.model.js";
// import OrderItemVariation from "../models/OrderItemVariation.model.js";
// import OrderItemSauce from "../models/OrderItemSauce.model.js";
// import OrderItemRemovedIngredient from "../models/OrderItemRemovedIngredient.model.js";
// import OrderItemExtra from "../models/OrderItemExtra.model.js";
// import Product from "../models/Product.model.js";
// import Payment from "../models/Payment.model.js";

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { id_client, client_name } = req.body;
//     let client = null;

//     if (id_client) {
//       client = await Client.findByPk(id_client);
//       if (!client) {
//         return res.status(404).json({
//           statusCode: 404,
//           message: "Cliente no encontrado",
//         });
//       }
//     } else if (client_name) {
//       client = await Client.findOne({ where: { client_name } });
//       if (!client) {
//         client = await Client.create({ client_name });
//       }
//     } else {
//       return res.status(400).json({
//         statusCode: 400,
//         message: "Debe enviar el ID o el nombre del cliente",
//       });
//     }
//     const orderNumber = await generateOrderNumber();
//     const order = await Order.create({
//       order_number: orderNumber,
//       id_client: client.id_client,
//       status: "open", 
//       opened_at: new Date(),
//     });

//     if (!order || !order.order_number) {
//       throw new Error("No se pudo generar el número de pedido");
//     }
//     return res.status(201).json({
//       statusCode: 201,
//       message: `Pedido ${order.order_number} creado correctamente`,
//       data: { order, client },
//     });
//   } catch (e: any) {
//     console.error(" Error en createOrder:", e);
//     res.status(500).json({
//       statusCode: 500,
//       message: "Error al crear el pedido",
//       error: e.message,
//     });
//   }
// };

// export const getOrders = async (req: Request, res: Response) => {
//   try {
//     const { status } = req.query;
//     const where = status ? { status } : {};
//     const orders = await Order.findAll({
//       where,
//       include: [
//         { model: Client, attributes: ["client_name"] },
//         { model: Payment },
//       ],
//       order: [["id_order", "DESC"]],
//     });
//     res.json({
//       statusCode: 200,
//       data: orders,
//     });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({
//       message: "Error al obtener pedidos",
//       error: e.message,
//     });
//   }
// };


// export const getOrderById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findByPk(id, {
//       include: [
//         { model: Client },
//         {
//           model: OrderItem,
//           include: [
//             { model: Product },
//             { model: OrderItemVariation },
//             { model: OrderItemSauce },
//             { model: OrderItemRemovedIngredient },
//             { model: OrderItemExtra },
//           ],
//         },
//         { model: Payment },
//       ],
//     });

//     if (!order)
//       return res.status(404).json({ statusCode: 404, message: "Pedido no encontrado" });
//     res.json({ statusCode: 200, data: order });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({ message: "Error al obtener el pedido", error: e.message });
//   }
// };

// /* -----------------------------------------------------
//    Agregar producto al pedido
// ----------------------------------------------------- */
// export const addOrderItem = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params; // id del pedido
//     const { id_product, quantity, variation, sauce, removedIngredients, extras } = req.body;
//     const order = await Order.findByPk(id);
//     if (!order)
//       return res.status(404).json({ message: "Pedido no encontrado" });

//     const product = await Product.findByPk(id_product, { include: ["variations", "extraIngredients", "ingredients"] });
//     if (!product)
//       return res.status(404).json({ message: "Producto no encontrado" });

//     // Base price (por variación o precio base)
//     const base_price_cents =
//       variation?.price_delta_cents ??
//       Math.round(Number(product.variations?.[0]?.price ?? 0) * 100);
//     const item = await OrderItem.create({
//       id_order: Number(id),
//       id_product,
//       product_name_snapshot: product.name,
//       image_snapshot: product.image,
//       quantity: quantity ?? 1,
//       base_price_cents,
//       unit_price_cents: base_price_cents,
//       line_total_cents: base_price_cents * (quantity ?? 1),
//     });

//     // Asociaciones (variación, salsa, ingredientes, extras)
//     if (variation)
//       await OrderItemVariation.create({
//         id_order_item: item.id_order_item,
//         id_variation: variation.id_variation,
//         name: variation.name,
//         price_delta_cents: variation.price_delta_cents,
//       });

//     if (sauce)
//       await OrderItemSauce.create({
//         id_order_item: item.id_order_item,
//         id_sauce: sauce.id_sauce,
//         name: sauce.name,
//       });

//     if (removedIngredients?.length)
//       await Promise.all(
//         removedIngredients.map((name: string) =>
//           OrderItemRemovedIngredient.create({ id_order_item: item.id_order_item, name })
//         )
//       );

//     if (extras?.length)
//       await Promise.all(
//         extras.map((e: any) =>
//           OrderItemExtra.create({
//             id_order_item: item.id_order_item,
//             id_extra_ingredient: e.id_extra_ingredient,
//             name: e.name,
//             price_delta_cents: e.price_delta_cents,
//             quantity: e.quantity ?? 1,
//           })
//         )
//       );

//     // Recalcular total del pedido
//     await recalcOrderTotal(Number(id));
//     res.status(201).json({
//       statusCode: 201,
//       message: "Producto agregado al pedido",
//       data: item,
//     });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({
//       message: "Error al agregar producto al pedido",
//       error: e.message,
//     });
//   }
// };


// export const updateOrderItem = async (req: Request, res: Response) => {
//   try {
//     const { id_item } = req.params;
//     const { quantity, notes } = req.body;
//     const item = await OrderItem.findByPk(id_item);
//     if (!item)
//       return res.status(404).json({ message: "Producto del pedido no encontrado" });
//     const newQty = quantity ?? item.quantity;
//     const line_total_cents = item.unit_price_cents * newQty;
//     await item.update({ quantity: newQty, notes, line_total_cents });
//     await recalcOrderTotal(item.id_order);
//     res.json({
//       statusCode: 200,
//       message: "Producto actualizado correctamente",
//       data: item,
//     });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({ message: "Error al actualizar el producto", error: e.message });
//   }
// };

// /* -----------------------------------------------------
//    🔴 Eliminar producto del pedido
// ----------------------------------------------------- */
// export const deleteOrderItem = async (req: Request, res: Response) => {
//   try {
//     const { id_item } = req.params;
//     const item = await OrderItem.findByPk(id_item);
//     if (!item)
//       return res.status(404).json({ message: "Producto del pedido no encontrado" });
//     await item.destroy();
//     await recalcOrderTotal(item.id_order);
//     res.json({
//       statusCode: 200,
//       message: "Producto eliminado correctamente del pedido",
//     });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({ message: "Error al eliminar producto", error: e.message });
//   }
// };

// /* -----------------------------------------------------
//    💾 Confirmar pedido (guardar y cobrar)
// ----------------------------------------------------- */
// export const confirmOrder = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findByPk(id);
//     if (!order)
//       return res.status(404).json({ message: "Pedido no encontrado" });
//     await recalcOrderTotal(Number(id));
//     await order.update({ status: "pending" });
//     res.json({
//       statusCode: 200,
//       message: "Pedido confirmado, listo para pago",
//       data: order,
//     });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({ message: "Error al confirmar pedido", error: e.message });
//   }
// };

// /* -----------------------------------------------------
//    💳 Registrar pago del pedido
// ----------------------------------------------------- */
// export const registerPayment = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { method, tip_cents, amount_cents, change_cents } = req.body;
//     const order = await Order.findByPk(id);
//     if (!order)
//       return res.status(404).json({ message: "Pedido no encontrado" });

//     const payment = await Payment.create({
//       id_order: Number(id),
//       method,
//       tip_cents: tip_cents ?? 0,
//       amount_cents: amount_cents ?? 0,
//       change_cents: change_cents ?? 0,
//       status: "captured",
//     });

//     await order.update({
//       status: "completed",
//       closed_at: new Date(),
//     });

//     res.status(201).json({
//       statusCode: 201,
//       message: "Pago registrado correctamente",
//       data: payment,
//     });
//   } catch (e: any) {
//     console.error(e);
//     res.status(500).json({ message: "Error al registrar pago", error: e.message });
//   }
// };

// /* -----------------------------------------------------
//    🧮 Función utilitaria: recalcular total del pedido
// ----------------------------------------------------- */
// export const recalcOrderTotal = async (id_order: number) => {
//   const items = await OrderItem.findAll({ where: { id_order } });
//   const total = items.reduce((sum, i) => sum + i.line_total_cents, 0);
//   await Order.update({ total_cents: total }, { where: { id_order } });
// };

// /* -----------------------------------------------------
//    🧠 Generador de número de pedido (YYYYMMDD-XXX)
// ----------------------------------------------------- */
// async function generateOrderNumber(): Promise<string> {
//   const now = new Date();
//   const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD

//   // Obtener rango del día actual
//   const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

//   // Contar las órdenes creadas hoy
//   const ordersToday = await Order.count({
//     where: {
//       createdAt: {
//         [Op.between]: [startOfDay, endOfDay],
//       },
//     },
//   });

//   // Generar secuencia de tres dígitos (001, 002, 003, ...)
//   const sequence = (ordersToday + 1).toString().padStart(3, "0");

//   // Resultado final
//   return `${datePart}-${sequence}`;
// }
