import { Response, Request } from "express";
import Order from "../models/Order.model.js";
import OrderItem from "../models/OrderItem.model.js"

export class OrderController {
static createOrder = async (req: Request, res: Response) => {
  const { items, ...orderData } = req.body;

  try {
    // Crear la orden
    const order = await Order.create(orderData);

    // Crear los items si existen
    if (items && items.length > 0) {
      const itemsWithOrderId = items.map((item: any) => ({
        ...item,
        orderId: order.id,
      }));

      await OrderItem.bulkCreate(itemsWithOrderId);
    }

    res.json({ message: "Orden creada correctamente", data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
};


  static getOrders = async (req: Request, res: Response) => {
    try {
      const order = await Order.findAll();
      res.json({ data: order });
    } catch (error) {
      console.log(error);
    }
  };

  static getOrderById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      res.json({ data: order });
    } catch (error) {
      console.log(error);
    }
  };

  static updateOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      await order.update(req.body);
      return res.json({
        message: "Orden actualizada correctamente",
        data: order,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar la orden" });
    }
  };

  static deleteOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      await order.destroy();

      return res.json({ message: "Orden eliminada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar la orden" });
    }
  };
}
