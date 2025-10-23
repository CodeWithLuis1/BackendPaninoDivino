import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Product from './Product.model.js';

@Table({
  tableName: 'categories',
  timestamps: false,
})
class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_category: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Product)
  declare products: Product[];
}

export default Category;
