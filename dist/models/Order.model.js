var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// models/Order.model.ts
import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, HasOne, Default } from "sequelize-typescript";
import Client from "./Client.model.js";
import OrderItem from "./OrderItem.modal.js";
import Payment from "./Payment.model.js";
let Order = class Order extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Order.prototype, "id_order", void 0);
__decorate([
    Column({
        type: DataType.STRING(30),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "order_number", void 0);
__decorate([
    ForeignKey(() => Client),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Order.prototype, "id_client", void 0);
__decorate([
    BelongsTo(() => Client),
    __metadata("design:type", Client)
], Order.prototype, "client", void 0);
__decorate([
    Default('open'),
    Column(DataType.ENUM('open', 'pending', 'completed', 'cancelled')),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Order.prototype, "opened_at", void 0);
__decorate([
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Order.prototype, "closed_at", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Order.prototype, "total_cents", void 0);
__decorate([
    HasMany(() => OrderItem),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    HasOne(() => Payment),
    __metadata("design:type", Payment)
], Order.prototype, "payment", void 0);
Order = __decorate([
    Table({ tableName: "orders", timestamps: true })
], Order);
export default Order;
//# sourceMappingURL=Order.model.js.map