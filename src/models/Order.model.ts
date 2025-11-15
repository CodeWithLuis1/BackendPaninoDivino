import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

export type OrderStatus = 'open' | 'pending' | 'completed' | 'cancelled';

@Table({ tableName: "orders", timestamps: true })
export default class Order extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id_order: number;

  @Column({ type: DataType.STRING(30), allowNull: false, unique: true })
  declare order_number: string;

  // SIN @ForeignKey
  @Column(DataType.INTEGER)
  declare id_client: number | null;

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

  // Solo TS
  declare client?: any;
  declare orderItems?: any[];
  declare payment?: any;
}
