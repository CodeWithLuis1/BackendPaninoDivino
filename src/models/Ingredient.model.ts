import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product.model.js';

@Table({
  tableName: 'ingredients',
  timestamps: false,
})
class Ingredient extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_ingredient: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare id_product: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @Column(DataType.STRING(100))
  declare name: string;
}

export default Ingredient;
