import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import Category from './Category.model.js';
import ProductVariation from './ProductVariation.model.js';
import Ingredient from './Ingredient.model.js';
import Sauce from './Sauce.model.js';
import ProductSauce from './ProductSauce.model.js';
import ExtraIngredients from './ExtraIngredients.model.js';
import ProductExtraIngredient from './ProductExtraIngredient.model.js';

@Table({
  tableName: 'products',
  timestamps: false,
})
class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_product: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  declare id_category: number;

  @BelongsTo(() => Category)
  declare category: Category;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column(DataType.TEXT)
  declare description?: string;

  @Column(DataType.TEXT)
  declare image?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare active: boolean;

  @HasMany(() => ProductVariation)
  declare variations: ProductVariation[];

  @HasMany(() => Ingredient)
  declare ingredients: Ingredient[];

  @BelongsToMany(() => Sauce, () => ProductSauce)
  declare sauces: Sauce[];

  @BelongsToMany(() => ExtraIngredients, () => ProductExtraIngredient)
  declare extraIngredients: ExtraIngredients[];
}

export default Product;
