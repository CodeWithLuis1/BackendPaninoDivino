import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

  // Solo para TS
  declare products?: any[];
}

export default Category;
