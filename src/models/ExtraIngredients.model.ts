import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'extra_ingredients',
  timestamps: false,
})
class ExtraIngredients extends Model {
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
}

export default ExtraIngredients;
