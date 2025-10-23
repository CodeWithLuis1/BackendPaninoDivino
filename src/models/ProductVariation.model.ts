import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product.model.js';

@Table({
  tableName: 'product_variations',
  timestamps: false,
})
class ProductVariation extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_variation: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare id_product: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @Column(DataType.STRING(100))
  declare name: string;

  @Column(DataType.DECIMAL(10, 2))
  declare price: number;
}

export default ProductVariation;
