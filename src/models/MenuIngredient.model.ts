import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

  // Solo TS
  declare ingredientLinks?: any[];
}

export default MenuIngredient;
