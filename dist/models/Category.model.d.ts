import { Model } from 'sequelize-typescript';
declare class Category extends Model {
    id_category: number;
    name: string;
    products?: any[];
}
export default Category;
