import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({ tableName: "order_items", timestamps: true })
export default class OrderItem extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id_order_item: number;

  @Column(DataType.INTEGER)
  declare id_order: number;

  @Column(DataType.INTEGER)
  declare id_product: number;

  @Column(DataType.STRING(150))
  declare product_name_snapshot: string;

  @Column(DataType.TEXT)
  declare image_snapshot: string | null;

  @Default(1)
  @Column(DataType.INTEGER)
  declare quantity: number;

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

  // Solo TS
  declare order?: any;
  declare product?: any;
  declare ingredients?: any[];
}
