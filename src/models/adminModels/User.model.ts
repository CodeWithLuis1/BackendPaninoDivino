import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import Role from "./Role.model.js";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

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
  declare password: string; // Hash

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare roleId: number;

  @BelongsTo(() => Role)
  declare role: Role;

  // Hooks: hash automático de contraseñas
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    const isHashed = /^\$2[aby]\$/.test(user.password); // detecta si ya es bcrypt
    if (!isHashed) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;
