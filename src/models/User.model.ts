import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  Unique,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true, // sin createdAt/updatedAt
})
class User extends Model {
  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string; // se recomienda guardar el hash

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string;
  // Opcional: si quieres tipar explícitamente los campos automáticos
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default User;
