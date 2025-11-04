import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Product from "./Product.model.js";
import ExtraIngredient from "./ExtraIngredients.model.js";

@Table({
  tableName: "product_extra_ingredients",
  timestamps: false,
})
class ProductExtraIngredient extends Model {
  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare id_product: number;

  @ForeignKey(() => ExtraIngredient)
  @Column(DataType.INTEGER)
  declare id_extra_ingredient: number;
}

export default ProductExtraIngredient;
