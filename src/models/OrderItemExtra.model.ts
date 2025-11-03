import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import OrderItem from './OrderItem.model.js';
import ExtraIngredients from './ExtraIngredients.model.js';

@Table({ tableName: 'order_item_extras', timestamps: false })
export default class OrderItemExtra extends Model {
  @ForeignKey(() => OrderItem)
  @Column(DataType.INTEGER)
  declare id_order_item: number;

  @BelongsTo(() => OrderItem) declare orderItem: OrderItem;

  @ForeignKey(() => ExtraIngredients)
  @Column(DataType.INTEGER)
  declare id_extra_ingredient: number;

  @Default(1) @Column(DataType.INTEGER) declare quantity: number;

  @Column(DataType.STRING(100)) declare name: string; // snapshot
  @Column(DataType.INTEGER) declare price_delta_cents: number; // precio del extra por unidad
}
