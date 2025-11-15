var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import Product from './Product.model.js';
import MenuIngredient from './MenuIngredient.model.js';
let ProductIngredientLink = class ProductIngredientLink extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ProductIngredientLink.prototype, "product_ingredient_link_id", void 0);
__decorate([
    ForeignKey(() => Product),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], ProductIngredientLink.prototype, "product_id", void 0);
__decorate([
    ForeignKey(() => MenuIngredient),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], ProductIngredientLink.prototype, "ingredient_id", void 0);
__decorate([
    Column({
        type: DataType.ENUM('base', 'extra'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProductIngredientLink.prototype, "ingredient_role", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], ProductIngredientLink.prototype, "is_default_selected", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], ProductIngredientLink.prototype, "is_removable", void 0);
__decorate([
    Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0.0,
    }),
    __metadata("design:type", Number)
], ProductIngredientLink.prototype, "additional_price", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], ProductIngredientLink.prototype, "is_active", void 0);
__decorate([
    BelongsTo(() => Product, { as: 'linkedProduct' }),
    __metadata("design:type", Product)
], ProductIngredientLink.prototype, "linkedProduct", void 0);
__decorate([
    BelongsTo(() => MenuIngredient, { as: 'linkedIngredient' }),
    __metadata("design:type", MenuIngredient)
], ProductIngredientLink.prototype, "linkedIngredient", void 0);
ProductIngredientLink = __decorate([
    Table({
        tableName: 'product_ingredient_links',
        timestamps: true,
    })
], ProductIngredientLink);
export default ProductIngredientLink;
//# sourceMappingURL=ProductIngredientLink.model.js.map