import { Model } from 'sequelize-typescript';
declare class ProductIngredientLink extends Model {
    product_ingredient_link_id: number;
    product_id: number;
    ingredient_id: number;
    ingredient_role: 'base' | 'extra';
    is_default_selected: boolean;
    is_removable: boolean;
    additional_price: number;
    is_active: boolean;
    linkedProduct?: any;
    linkedIngredient?: any;
}
export default ProductIngredientLink;
