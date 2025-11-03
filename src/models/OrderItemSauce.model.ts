import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import OrderItem from './OrderItem.model.js';
import Sauce from './Sauce.model.js';

@Table({ tableName: 'order_item_sauces', timestamps: false })
export default class OrderItemSauce extends Model {
  @ForeignKey(() => OrderItem)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare id_order_item: number;

  @ForeignKey(() => Sauce)
  @Column(DataType.INTEGER)
  declare id_sauce: number;

  @BelongsTo(() => OrderItem) declare orderItem: OrderItem;

  @Column(DataType.STRING(100)) declare name: string; // snapshot
}
