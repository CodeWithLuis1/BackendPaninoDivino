import {Table,Column,Model,DataType,ForeignKey,BelongsTo,HasMany,Default,} from "sequelize-typescript";

import Order from "./Order.model.js";
import Product from "./Product.model.js";
import OrderItemIngredient from "./OrderItemIngredient.model.js"; // <-- IMPORTANTE

// This model represents a single product added to a customer’s order, storing all details needed to reproduce exactly what was requested at the moment of purchase. It tracks the associated order and product, keeps a snapshot of the product’s name and image for historical accuracy, calculates all pricing values (base price, extras, unit price, and line total), saves any customer notes, and maintains a list of ingredient modifications—such as added or removed items—through its relationship with OrderItemIngredient.

@Table({ tableName: "order_items", timestamps: true })
export default class OrderItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id_order_item: number;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  declare id_order: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare id_product: number;

  @BelongsTo(() => Product)
  declare product: Product;

  // Snapshot del producto para reportes
  @Column(DataType.STRING(150))
  declare product_name_snapshot: string;

  @Column(DataType.TEXT)
  declare image_snapshot: string | null;

  @Default(1)
  @Column(DataType.INTEGER)
  declare quantity: number;

  // precios
  @Default(0)
  @Column(DataType.INTEGER)
  declare base_price_cents: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare extras_total_cents: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare unit_price_cents: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare line_total_cents: number;

  @Column(DataType.TEXT)
  declare notes: string | null;

  // 🔗 Relación con ingredientes seleccionados/modificados en el pedido
  @HasMany(() => OrderItemIngredient)
  declare ingredients: OrderItemIngredient[];
}
