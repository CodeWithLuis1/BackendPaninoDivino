import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Product from './Product.model.js';
import Sauce from './Sauce.model.js';

@Table({
  tableName: 'product_sauces',
  timestamps: false,
})
class ProductSauce extends Model {
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_product: number;

  @ForeignKey(() => Sauce)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_sauce: number;
}

export default ProductSauce;
