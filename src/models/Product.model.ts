import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import Category from './Category.model.js';
import ProductIngredientLink from './ProductIngredientLink.model.js';

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
  
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: string;

  @Column(DataType.TEXT)
  declare image?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare active: boolean;

@HasMany(() => ProductIngredientLink, { as: "productIngredientLinks" })
declare productIngredientLinks: ProductIngredientLink[];

}

export default Product;
