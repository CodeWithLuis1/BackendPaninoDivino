import { Model } from 'sequelize-typescript';
import Product from './Product.model.js';
import MenuIngredient from './MenuIngredient.model.js';
declare class ProductIngredientLink extends Model {
    product_ingredient_link_id: number;
    product_id: number;
    ingredient_id: number;
    ingredient_role: 'base' | 'extra';
    is_default_selected: boolean;
    is_removable: boolean;
    additional_price: number;
    is_active: boolean;
    linkedProduct: Product;
    linkedIngredient: MenuIngredient;
}
export default ProductIngredientLink;
