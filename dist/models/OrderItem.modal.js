var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, Default, } from "sequelize-typescript";
import Order from "./Order.model.js";
import Product from "./Product.model.js";
import OrderItemIngredient from "./OrderItemIngredient.model.js"; // <-- IMPORTANTE
// This model represents a single product added to a customer’s order, storing all details needed to reproduce exactly what was requested at the moment of purchase. It tracks the associated order and product, keeps a snapshot of the product’s name and image for historical accuracy, calculates all pricing values (base price, extras, unit price, and line total), saves any customer notes, and maintains a list of ingredient modifications—such as added or removed items—through its relationship with OrderItemIngredient.
let OrderItem = class OrderItem extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "id_order_item", void 0);
__decorate([
    ForeignKey(() => Order),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "id_order", void 0);
__decorate([
    BelongsTo(() => Order),
    __metadata("design:type", Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    ForeignKey(() => Product),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "id_product", void 0);
__decorate([
    BelongsTo(() => Product),
    __metadata("design:type", Product)
], OrderItem.prototype, "product", void 0);
__decorate([
    Column(DataType.STRING(150)),
    __metadata("design:type", String)
], OrderItem.prototype, "product_name_snapshot", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], OrderItem.prototype, "image_snapshot", void 0);
__decorate([
    Default(1),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "base_price_cents", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "extras_total_cents", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "unit_price_cents", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItem.prototype, "line_total_cents", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], OrderItem.prototype, "notes", void 0);
__decorate([
    HasMany(() => OrderItemIngredient),
    __metadata("design:type", Array)
], OrderItem.prototype, "ingredients", void 0);
OrderItem = __decorate([
    Table({ tableName: "order_items", timestamps: true })
], OrderItem);
export default OrderItem;
//# sourceMappingURL=OrderItem.modal.js.map