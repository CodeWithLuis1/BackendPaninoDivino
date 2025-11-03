import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
  Default,
} from "sequelize-typescript";
import Order from "./Order.model.js";
import Product from "./Product.model.js";
import OrderItemVariation from "./OrderItemVariation.model.js";
import OrderItemSauce from "./OrderItemSauce.model.js";
import OrderItemRemovedIngredient from "./OrderItemRemovedIngredient.model.js";
import OrderItemExtra from "./OrderItemExtra.model.js";

@Table({ tableName: "order_items", timestamps: true })
export default class OrderItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id_order_item: number;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  declare id_order: number;

  @BelongsTo(() => Order) declare order: Order;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare id_product: number;

  @BelongsTo(() => Product) declare product: Product;

  // snapshot para reportes aunque cambie el producto
  @Column(DataType.STRING(150)) declare product_name_snapshot: string;
  @Column(DataType.TEXT) declare image_snapshot: string | null;

  @Default(1)
  @Column(DataType.INTEGER)
  declare quantity: number;

  // precios en centavos
  @Default(0) @Column(DataType.INTEGER) declare base_price_cents: number; // de la variante o del producto
  @Default(0) @Column(DataType.INTEGER) declare extras_total_cents: number; // suma de extras * cantidad
  @Default(0) @Column(DataType.INTEGER) declare unit_price_cents: number; // base + extras (por unidad)
  @Default(0) @Column(DataType.INTEGER) declare line_total_cents: number; // unit * qty

  @Column(DataType.TEXT) declare notes: string | null;

  @HasOne(() => OrderItemVariation) declare variation: OrderItemVariation;
  @HasOne(() => OrderItemSauce) declare sauce: OrderItemSauce;
  @HasMany(() => OrderItemRemovedIngredient)
  declare removedIngredients: OrderItemRemovedIngredient[];
  @HasMany(() => OrderItemExtra) declare extras: OrderItemExtra[];
}
