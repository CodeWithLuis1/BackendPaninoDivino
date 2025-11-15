// models/Order.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  HasOne,
  Default
} from "sequelize-typescript";
import Client from "./Client.model.js";
import OrderItem from "./OrderItem.modal.js";
import Payment from "./Payment.model.js";

export type OrderStatus = 'open' | 'pending' | 'completed' | 'cancelled';

@Table({ tableName: "orders", timestamps: true })
export default class Order extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id_order: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
  })
  declare order_number: string;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  declare id_client: number | null;

  @BelongsTo(() => Client)
  declare client: Client;

  @Default('open')
  @Column(DataType.ENUM('open', 'pending', 'completed', 'cancelled'))
  declare status: OrderStatus;

  @Column(DataType.DATE)
  declare opened_at: Date;

  @Column(DataType.DATE)
  declare closed_at: Date | null;

  @Default(0)
  @Column(DataType.INTEGER)
  declare total_cents: number;

  @HasMany(() => OrderItem)
  declare items: OrderItem[];

  @HasOne(() => Payment)
  declare payment: Payment;
}