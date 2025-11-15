import { Model } from 'sequelize-typescript';
declare class MenuIngredient extends Model {
    ingredient_id: number;
    ingredient_name: string;
    is_active: boolean;
    ingredientLinks?: any[];
}
export default MenuIngredient;
