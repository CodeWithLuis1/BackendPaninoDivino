import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { OrderItem } from "./OrderItem.model.js";

@Table({
  tableName: "orders",
  timestamps: true, // createdAt, updatedAt
})
export class Order extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  declare tableNumber: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare customerName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare waiter: string;

  @Column({
    type: DataType.ENUM("bajo", "normal", "urgente"),
    allowNull: false,
    defaultValue: "normal",
  })
  declare priority: "bajo" | "normal" | "urgente";

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare specialInstructions: string;

  // Relación con items
  @HasMany(() => OrderItem)
  declare items: OrderItem[];
}

export default Order;