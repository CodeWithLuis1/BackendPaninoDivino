import { Table, Column, Model, DataType } from "sequelize-typescript";

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

  @Column(DataType.INTEGER)
  declare id_order_item: number;

  @Column(DataType.INTEGER)
  declare id_ingredient: number;

  @Column(DataType.STRING(150))
  declare ingredient_name_snapshot: string;

  @Column(DataType.ENUM("base", "extra"))
  declare ingredient_role: "base" | "extra";

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare selected: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_removed: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare additional_price_cents: number;

  // Solo TS
  declare orderItem?: any;
  declare ingredient?: any;
}
