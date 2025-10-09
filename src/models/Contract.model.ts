import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User.model.js';

@Table({
  tableName: 'contracts',
  timestamps: true,
})
class Contract extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare clientName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare service: string;

  @Column({
    type: DataType.ENUM('Pendiente de Documentos', 'Contrato enviado', 'Reunión inicial programada','Proceso finalizado'),
    allowNull: false,
    defaultValue: 'Pendiente de Documentos',
  })
  declare status: 'Pendiente de Documentos' | 'Contrato enviado' | 'Reunión inicial programada'|'Proceso finalizado';

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare createdBy: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default Contract;
