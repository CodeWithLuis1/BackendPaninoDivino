import { Model } from 'sequelize-typescript';
import Product from './Product.model.js';
declare class Category extends Model {
    id_category: number;
    name: string;
    products: Product[];
}
export default Category;
