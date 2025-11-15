import { Model } from "sequelize-typescript";
export default class OrderItem extends Model {
    id_order_item: number;
    id_order: number;
    id_product: number;
    product_name_snapshot: string;
    image_snapshot: string | null;
    quantity: number;
    base_price_cents: number;
    extras_total_cents: number;
    unit_price_cents: number;
    line_total_cents: number;
    notes: string | null;
    order?: any;
    product?: any;
    ingredients?: any[];
}
