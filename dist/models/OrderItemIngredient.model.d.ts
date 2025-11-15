import { Model } from "sequelize-typescript";
export default class OrderItemIngredient extends Model {
    id_order_item_ingredient: number;
    id_order_item: number;
    id_ingredient: number;
    ingredient_name_snapshot: string;
    ingredient_role: "base" | "extra";
    selected: boolean;
    is_removed: boolean;
    additional_price_cents: number;
    orderItem?: any;
    ingredient?: any;
}
