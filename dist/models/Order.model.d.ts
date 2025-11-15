import { Model } from "sequelize-typescript";
import Client from "./Client.model.js";
import OrderItem from "./OrderItem.modal.js";
import Payment from "./Payment.model.js";
export type OrderStatus = 'open' | 'pending' | 'completed' | 'cancelled';
export default class Order extends Model {
    id_order: number;
    order_number: string;
    id_client: number | null;
    client: Client;
    status: OrderStatus;
    opened_at: Date;
    closed_at: Date | null;
    total_cents: number;
    items: OrderItem[];
    payment: Payment;
}
