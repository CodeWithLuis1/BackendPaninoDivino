var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, } from "sequelize-typescript";
import OrderItem from "./OrderItem.modal.js";
import MenuIngredient from "./MenuIngredient.model.js";
// “This table stores all the details of the order; with it, we have all the customer’s order information.”
let OrderItemIngredient = class OrderItemIngredient extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], OrderItemIngredient.prototype, "id_order_item_ingredient", void 0);
__decorate([
    ForeignKey(() => OrderItem),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItemIngredient.prototype, "id_order_item", void 0);
__decorate([
    BelongsTo(() => OrderItem),
    __metadata("design:type", OrderItem)
], OrderItemIngredient.prototype, "orderItem", void 0);
__decorate([
    ForeignKey(() => MenuIngredient),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], OrderItemIngredient.prototype, "id_ingredient", void 0);
__decorate([
    BelongsTo(() => MenuIngredient),
    __metadata("design:type", MenuIngredient)
], OrderItemIngredient.prototype, "ingredient", void 0);
__decorate([
    Column(DataType.STRING(150)),
    __metadata("design:type", String)
], OrderItemIngredient.prototype, "ingredient_name_snapshot", void 0);
__decorate([
    Column(DataType.ENUM("base", "extra")),
    __metadata("design:type", String)
], OrderItemIngredient.prototype, "ingredient_role", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], OrderItemIngredient.prototype, "selected", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], OrderItemIngredient.prototype, "is_removed", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], OrderItemIngredient.prototype, "additional_price_cents", void 0);
OrderItemIngredient = __decorate([
    Table({
        tableName: "order_item_ingredients",
        timestamps: true,
    })
], OrderItemIngredient);
export default OrderItemIngredient;
//# sourceMappingURL=OrderItemIngredient.model.js.map