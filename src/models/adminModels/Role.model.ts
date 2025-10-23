// models/Role.model.ts
import { Table, Column, Model, DataType, Unique } from "sequelize-typescript";

@Table({
  tableName: "roles",
  timestamps: false,
})
class Role extends Model {
  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;
}

export default Role;
