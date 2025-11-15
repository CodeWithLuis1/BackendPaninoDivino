import { Model } from 'sequelize-typescript';
declare class Product extends Model {
    id_product: number;
    id_category: number;
    name: string;
    description?: string;
    price: string;
    image?: string;
    active: boolean;
    category?: any;
    productIngredientLinks?: any[];
}
export default Product;
