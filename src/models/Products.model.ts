import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true, // createdAt, updatedAt
})
export class Product extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare nombre: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare categoria: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare costoCompra: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare precioVenta: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare unidadMedida: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare activo: boolean;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare fechaCreacion: string;
}

export default Product;
