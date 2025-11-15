var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
let Payment = class Payment extends Model {
};
__decorate([
    Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Payment.prototype, "id_payment", void 0);
__decorate([
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Payment.prototype, "id_order", void 0);
__decorate([
    Column(DataType.ENUM('cash', 'card')),
    __metadata("design:type", String)
], Payment.prototype, "method", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Payment.prototype, "amount_cents", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Payment.prototype, "tip_cents", void 0);
__decorate([
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Payment.prototype, "change_cents", void 0);
__decorate([
    Default('initiated'),
    Column(DataType.ENUM('initiated', 'captured', 'failed', 'voided')),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    Column(DataType.STRING(60)),
    __metadata("design:type", String)
], Payment.prototype, "reference", void 0);
Payment = __decorate([
    Table({ tableName: 'payments', timestamps: true })
], Payment);
export default Payment;
//# sourceMappingURL=Payment.model.js.map