import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_product: number;

  // 🔥 ANTES TENÍAS @ForeignKey → QUITADO
  @Column(DataType.INTEGER)
  declare id_category: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column(DataType.TEXT)
  declare description?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: string;

  @Column(DataType.TEXT)
  declare image?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare active: boolean;

  // 👇 Propiedades agregadas SOLO para TypeScript (no para Sequelize)
  declare category?: any;
  declare productIngredientLinks?: any[];
}

export default Product;
