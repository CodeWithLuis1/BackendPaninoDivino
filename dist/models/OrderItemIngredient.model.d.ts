import { Model } from "sequelize-typescript";
import OrderItem from "./OrderItem.modal.js";
import MenuIngredient from "./MenuIngredient.model.js";
export default class OrderItemIngredient extends Model {
    id_order_item_ingredient: number;
    id_order_item: number;
    orderItem: OrderItem;
    id_ingredient: number;
    ingredient: MenuIngredient;
    ingredient_name_snapshot: string;
    ingredient_role: "base" | "extra";
    selected: boolean;
    is_removed: boolean;
    additional_price_cents: number;
}
