import { Model } from 'sequelize-typescript';
import Category from './Category.model.js';
declare class Product extends Model {
    id_product: number;
    id_category: number;
    category: Category;
    name: string;
    description?: string;
    price: string;
    image?: string;
    active: boolean;
    productIngredientLinks?: any[];
}
export default Product;
