import { Model } from 'sequelize-typescript';
import ProductIngredientLink from './ProductIngredientLink.model.js';
declare class MenuIngredient extends Model {
    ingredient_id: number;
    ingredient_name: string;
    is_active: boolean;
    productIngredientLinks: ProductIngredientLink[];
}
export default MenuIngredient;
