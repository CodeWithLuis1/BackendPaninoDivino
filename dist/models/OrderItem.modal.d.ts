import { Model } from "sequelize-typescript";
import Order from "./Order.model.js";
import Product from "./Product.model.js";
import OrderItemIngredient from "./OrderItemIngredient.model.js";
export default class OrderItem extends Model {
    id_order_item: number;
    id_order: number;
    order: Order;
    id_product: number;
    product: Product;
    product_name_snapshot: string;
    image_snapshot: string | null;
    quantity: number;
    base_price_cents: number;
    extras_total_cents: number;
    unit_price_cents: number;
    line_total_cents: number;
    notes: string | null;
    ingredients: OrderItemIngredient[];
}
