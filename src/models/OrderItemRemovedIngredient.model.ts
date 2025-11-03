import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import OrderItem from './OrderItem.model.js';

@Table({ tableName: 'order_item_removed_ingredients', timestamps: false })
export default class OrderItemRemovedIngredient extends Model {
  @ForeignKey(() => OrderItem)
  @Column(DataType.INTEGER)
  declare id_order_item: number;

  @BelongsTo(() => OrderItem) declare orderItem: OrderItem;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare name: string; // snapshot del ingrediente base que se quitó
}
