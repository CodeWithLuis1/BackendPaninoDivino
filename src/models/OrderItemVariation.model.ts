import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import OrderItem from "./OrderItem.model.js";
import ProductVariation from "./ProductVariation.model.js";

@Table({ tableName: "order_item_variations", timestamps: false })
export default class OrderItemVariation extends Model {
  @ForeignKey(() => OrderItem)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare id_order_item: number;

  @ForeignKey(() => ProductVariation)
  @Column(DataType.INTEGER)
  declare id_variation: number;

  @BelongsTo(() => OrderItem) declare orderItem: OrderItem;

  @Column(DataType.STRING(100)) declare name: string; // snapshot
  @Column(DataType.INTEGER) declare price_delta_cents: number; // ej: +1000 para "con papas"
}
