import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import ProductIngredientLink from './ProductIngredientLink.model.js';

@Table({
  tableName: 'menu_ingredients', 
  timestamps: true,
})
class MenuIngredient extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare ingredient_id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare ingredient_name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  // 🔗 Relaciones
  @HasMany(() => ProductIngredientLink)
  declare productIngredientLinks: ProductIngredientLink[];
}

export default MenuIngredient;
