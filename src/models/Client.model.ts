import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: false,
})
class Client extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_client: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare client_name: string;
}

export default Client;
