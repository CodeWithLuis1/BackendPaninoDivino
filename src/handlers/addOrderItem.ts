// handlers/orders.ts
import { Request, Response } from "express";
import { Op } from "sequelize";
import Order from "../models/Order.model.js";
import Client from "../models/Client.model.js";
import OrderItem from "../models/OrderItem.modal.js";
import Product from "../models/Product.model.js";
import Payment from "../models/Payment.model.js";
import OrderItemIngredient from "../models/OrderItemIngredient.model.js";
import MenuIngredient from "../models/MenuIngredient.model.js";


export const createOrder = async (req: Request, res: Response) => {
  try {
    const { id_client, client_name } = req.body;
    let client = null;

    if (id_client) {
      client = await Client.findByPk(id_client);
      if (!client) {
        return res.status(404).json({
          statusCode: 404,
          message: "Cliente no encontrado",
        });
      }
    } else if (client_name) {
      client = await Client.findOne({ where: { client_name } });
      if (!client) {
        client = await Client.create({ client_name });
      }
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Debe enviar el ID o el nombre del cliente",
      });
    }
    const orderNumber = await generateOrderNumber();
    const order = await Order.create({
      order_number: orderNumber,
      id_client: client.id_client,
      status: "open", 
      opened_at: new Date(),
    });

    if (!order || !order.order_number) {
      throw new Error("No se pudo generar el número de pedido");
    }
    return res.status(201).json({
      statusCode: 201,
      message: `Pedido ${order.order_number} creado correctamente`,
      data: { order, client },
    });
  } catch (e: any) {
    console.error(" Error en createOrder:", e);
    res.status(500).json({
      statusCode: 500,
      message: "Error al crear el pedido",
      error: e.message,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const orders = await Order.findAll({
      where,
      include: [
        { model: Client, attributes: ["client_name"] },
        { model: Payment },
      ],
      order: [["id_order", "DESC"]],
    });
    res.json({
      statusCode: 200,
      data: orders,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      message: "Error al obtener pedidos",
      error: e.message,
    });
  }
};


export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        { model: Client },

        {
          model: OrderItem,
          include: [
            { model: Product },

            // Ingredientes personalizados seleccionados en el pedido
            {
              model: OrderItemIngredient,
              include: [
                {
                  model: MenuIngredient,
                }
              ],
            },
          ],
        },

        { model: Payment },
      ],
      order: [
        [OrderItem, "id_order_item", "ASC"],
        [OrderItem, OrderItemIngredient, "id_order_item_ingredient", "ASC"]
      ]
    });

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Pedido no encontrado",
      });
    }

    return res.json({
      statusCode: 200,
      data: order,
    });

  } catch (e: any) {
    console.error("Error en getOrderById:", e);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al obtener el pedido",
      error: e.message,
    });
  }
};


/* -----------------------------------------------------
   Agregar producto al pedido
----------------------------------------------------- */
export const addOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // id del pedido
    const { id_product, quantity, removedIngredients,  } = req.body;
    const order = await Order.findByPk(id);
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });

    const product = await Product.findByPk(id_product);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Base price (por variación o precio base)
    const base_price_cents =
      Math.round(Number(product?.[0]?.price ?? 0) * 100);
    const item = await OrderItem.create({
      id_order: Number(id),
      id_product,
      product_name_snapshot: product.name,
      image_snapshot: product.image,
      quantity: quantity ?? 1,
      base_price_cents,
      unit_price_cents: base_price_cents,
      line_total_cents: base_price_cents * (quantity ?? 1),
    });

    // Recalcular total del pedido
    await recalcOrderTotal(Number(id));
    res.status(201).json({
      statusCode: 201,
      message: "Producto agregado al pedido",
      data: item,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      message: "Error al agregar producto al pedido",
      error: e.message,
    });
  }
};


export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { id_item } = req.params;
    const { quantity, notes } = req.body;

    const item = await OrderItem.findByPk(id_item);
    if (!item) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto del pedido no encontrado",
      });
    }
    const newQty = quantity ?? item.quantity;
    // 1) Actualizar cantidad y notas
    await item.update({
      quantity: newQty,
      notes: notes ?? item.notes,
    });

    // 2) Recalcular totales del item considerando ingredientes
    const updatedItem = await recalcOrderItemTotals(item.id_order_item);
    // 3) Recalcular total del pedido
    await recalcOrderTotal(item.id_order);
    return res.json({
      statusCode: 200,
      message: "Producto del pedido actualizado correctamente",
      data: updatedItem,
    });
  } catch (e: any) {
    console.error("Error al actualizar el producto del pedido:", e);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar el producto del pedido",
      error: e.message,
    });
  }
};


/* -----------------------------------------------------
    Eliminar producto del pedido
----------------------------------------------------- */
export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id_item } = req.params;
    const item = await OrderItem.findByPk(id_item);
    if (!item)
      return res.status(404).json({ message: "Producto del pedido no encontrado" });
    await item.destroy();
    await recalcOrderTotal(item.id_order);
    res.json({
      statusCode: 200,
      message: "Producto eliminado correctamente del pedido",
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Error al eliminar producto", error: e.message });
  }
};

/* -----------------------------------------------------
   Confirmar pedido (guardar y cobrar)
----------------------------------------------------- */
export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });
    await recalcOrderTotal(Number(id));
    await order.update({ status: "pending" });
    res.json({
      statusCode: 200,
      message: "Pedido confirmado, listo para pago",
      data: order,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Error al confirmar pedido", error: e.message });
  }
};

/* -----------------------------------------------------
   Registrar pago del pedido
----------------------------------------------------- */
export const registerPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { method, tip_cents, amount_cents, change_cents } = req.body;
    const order = await Order.findByPk(id);
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });

    const payment = await Payment.create({
      id_order: Number(id),
      method,
      tip_cents: tip_cents ?? 0,
      amount_cents: amount_cents ?? 0,
      change_cents: change_cents ?? 0,
      status: "captured",
    });

    await order.update({
      status: "completed",
      closed_at: new Date(),
    });

    res.status(201).json({
      statusCode: 201,
      message: "Pago registrado correctamente",
      data: payment,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Error al registrar pago", error: e.message });
  }
};

/* -----------------------------------------------------
   Función utilitaria: recalcular total del pedido
----------------------------------------------------- */
export const recalcOrderTotal = async (id_order: number) => {
  const items = await OrderItem.findAll({ where: { id_order } });
  const total = items.reduce((sum, i) => sum + i.line_total_cents, 0);
  await Order.update({ total_cents: total }, { where: { id_order } });
};

/* -----------------------------------------------------
   Generador de número de pedido (YYYYMMDD-XXX)
----------------------------------------------------- */
async function generateOrderNumber(): Promise<string> {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD

  // Obtener rango del día actual
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  // Contar las órdenes creadas hoy
  const ordersToday = await Order.count({
    where: {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });

  // Generar secuencia de tres dígitos (001, 002, 003, ...)
  const sequence = (ordersToday + 1).toString().padStart(3, "0");

  // Resultado final
  return `${datePart}-${sequence}`;
}

export const removeOrderItemIngredient = async (req: Request, res: Response) => {
  try {
    const { id, id_item, id_ingredient } = req.params;

    // 1. Validar pedido
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Pedido no encontrado",
      });
    }

    // 2. Validar item
    const item = await OrderItem.findByPk(id_item);
    if (!item || item.id_order !== Number(id)) {
      return res.status(404).json({
        statusCode: 404,
        message: "El producto del pedido no existe o no pertenece al pedido",
      });
    }

    // 3. Validar ingrediente del item
    const ingredient = await OrderItemIngredient.findOne({
      where: {
        id_order_item: id_item,
        id_ingredient
      }
    });

    if (!ingredient) {
      return res.status(404).json({
        statusCode: 404,
        message: "El ingrediente no pertenece a este item del pedido",
      });
    }

    // 4. Aplicar reglas
    const isBase = ingredient.ingredient_role === "base";

    await ingredient.update({
      selected: false,
      is_removed: isBase ? true : false,
      additional_price_cents: 0
    });

    // 5. Recalcular precios del OrderItem (USANDO LA FUNCIÓN NUEVA)
    const updatedItem = await recalcOrderItemTotals(item.id_order_item);

    // 6. Recalcular total del pedido
    await recalcOrderTotal(Number(id));

    return res.json({
      statusCode: 200,
      message: "Ingrediente actualizado correctamente",
      data: {
        removed_ingredient: ingredient,
        updated_item: updatedItem,
      }
    });

  } catch (error: any) {
    console.error("Error en removeOrderItemIngredient:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar ingrediente del item del pedido",
      error: error.message,
    });
  }
};

// 🔁 Recalcular precios de un solo item (base + extras)
export const recalcOrderItemTotals = async (id_order_item: number) => {
  const item = await OrderItem.findByPk(id_order_item);

  if (!item) {
    throw new Error("OrderItem no encontrado al recalcular totales");
  }

  // Traer ingredientes del item
  const ingredients = await OrderItemIngredient.findAll({
    where: { id_order_item }
  });

  // Sumar solo extras seleccionados
  const extras_total_cents = ingredients.reduce((sum, ing) => {
    return sum + (ing.selected ? ing.additional_price_cents : 0);
  }, 0);

  const unit_price_cents = item.base_price_cents + extras_total_cents;
  const line_total_cents = unit_price_cents * item.quantity;

  await item.update({
    extras_total_cents,
    unit_price_cents,
    line_total_cents,
  });

  return item;
};
