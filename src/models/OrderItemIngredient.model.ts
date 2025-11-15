import {Table,Column,Model,DataType,ForeignKey,BelongsTo,
} from "sequelize-typescript";

import OrderItem from "./OrderItem.modal.js";
import MenuIngredient from "./MenuIngredient.model.js";
// “This table stores all the details of the order; with it, we have all the customer’s order information.”

@Table({
  tableName: "order_item_ingredients",
  timestamps: true,
})
export default class OrderItemIngredient extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_order_item_ingredient: number;

  @ForeignKey(() => OrderItem)
  @Column(DataType.INTEGER)
  declare id_order_item: number;

  @BelongsTo(() => OrderItem)
  declare orderItem: OrderItem;

  @ForeignKey(() => MenuIngredient)
  @Column(DataType.INTEGER)
  declare id_ingredient: number;

  @BelongsTo(() => MenuIngredient)
  declare ingredient: MenuIngredient;

  // Snapshot del nombre (por si cambia el menú)
  @Column(DataType.STRING(150))
  declare ingredient_name_snapshot: string;

  // base o extra según el menú original
  @Column(DataType.ENUM("base", "extra"))
  declare ingredient_role: "base" | "extra";

  // si el usuario lo seleccionó en este pedido
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare selected: boolean;

  // si el usuario lo removió (solo aplica a base)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_removed: boolean;

  // precio extra real en este pedido
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare additional_price_cents: number;
}
