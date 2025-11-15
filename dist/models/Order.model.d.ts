import { Model } from "sequelize-typescript";
export type OrderStatus = 'open' | 'pending' | 'completed' | 'cancelled';
export default class Order extends Model {
    id_order: number;
    order_number: string;
    id_client: number | null;
    status: OrderStatus;
    opened_at: Date;
    closed_at: Date | null;
    total_cents: number;
    client?: any;
    orderItems?: any[];
    payment?: any;
}
