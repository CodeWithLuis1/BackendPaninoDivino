import { Table, Column, Model, DataType, ForeignKey, BelongsTo,Default } from 'sequelize-typescript';
import Product from './Product.model.js';

@Table({
  tableName: "extra_ingredients",
  timestamps: false,
})
class ExtraIngredient extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_extra_ingredient: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Column(DataType.FLOAT)
  declare quantity_per_use: number | null; // cuánto se usa cuando se agrega

  @Column(DataType.STRING(20))
  declare unit: string | null; // "g", "ml", "unidad", etc.

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare track_in_inventory: boolean; // si afecta stock
}

export default ExtraIngredient;