import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Order } from "./Order.model.js";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export class OrderItem extends Model {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare paniniId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;
}
export default OrderItem