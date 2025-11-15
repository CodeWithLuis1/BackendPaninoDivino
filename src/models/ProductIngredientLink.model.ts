import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'product_ingredient_links',
  timestamps: true,
})
class ProductIngredientLink extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare product_ingredient_link_id: number;

  @Column(DataType.INTEGER)
  declare product_id: number;

  @Column(DataType.INTEGER)
  declare ingredient_id: number;

  @Column({
    type: DataType.ENUM('base', 'extra'),
    allowNull: false,
  })
  declare ingredient_role: 'base' | 'extra';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_default_selected: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_removable: boolean;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0.0,
  })
  declare additional_price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  // Propiedades para TS (sin decoradores)
  declare linkedProduct?: any;
  declare linkedIngredient?: any;
}

export default ProductIngredientLink;
