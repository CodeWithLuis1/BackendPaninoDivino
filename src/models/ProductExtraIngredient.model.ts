import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Product from './Product.model.js';
import ExtraIngredients from './ExtraIngredients.model.js';

@Table({
  tableName: 'product_extra_ingredients',
  timestamps: false,
})
class ProductExtraIngredient extends Model {
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_product: number;

  @ForeignKey(() => ExtraIngredients)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_extra_ingredient: number;
}

export default ProductExtraIngredient;
