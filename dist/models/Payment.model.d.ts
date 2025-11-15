import { Model } from 'sequelize-typescript';
export type PaymentMethod = 'cash' | 'card';
export type PaymentStatus = 'initiated' | 'captured' | 'failed' | 'voided';
export default class Payment extends Model {
    id_payment: number;
    id_order: number;
    method: PaymentMethod;
    amount_cents: number;
    tip_cents: number;
    change_cents: number;
    status: PaymentStatus;
    reference: string | null;
    order?: any;
}
