import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'sauces',
  timestamps: false,
})
class Sauce extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_sauce: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;
}

export default Sauce;
