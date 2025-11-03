import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import Order from './Order.model.js';

export type PaymentMethod = 'cash' | 'card';
export type PaymentStatus = 'initiated' | 'captured' | 'failed' | 'voided';

@Table({ tableName: 'payments', timestamps: true })
export default class Payment extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id_payment: number;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  declare id_order: number;

  @BelongsTo(() => Order) declare order: Order;

  @Column(DataType.ENUM('cash','card')) declare method: PaymentMethod;

  @Default(0) @Column(DataType.INTEGER) declare amount_cents: number; // monto cobrado
  @Default(0) @Column(DataType.INTEGER) declare tip_cents: number;
  @Default(0) @Column(DataType.INTEGER) declare change_cents: number;

  @Default('initiated')
  @Column(DataType.ENUM('initiated','captured','failed','voided'))
  declare status: PaymentStatus;

  @Column(DataType.STRING(60)) declare reference: string | null; // id terminal, token, etc.
}
