var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, Unique, ForeignKey, BelongsTo, BeforeCreate, BeforeUpdate, } from "sequelize-typescript";
import bcrypt from "bcrypt";
import Role from "./Role.model.js";
let User = class User extends Model {
    // Hooks: hash automático de contraseñas
    static async hashPassword(user) {
        const isHashed = /^\$2[aby]\$/.test(user.password); // detecta si ya es bcrypt
        if (!isHashed) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
};
__decorate([
    Column({
        type: DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Unique,
    Column({
        type: DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    ForeignKey(() => Role),
    Column({
        type: DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    BelongsTo(() => Role),
    __metadata("design:type", Role)
], User.prototype, "role", void 0);
__decorate([
    BeforeCreate,
    BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
User = __decorate([
    Table({
        tableName: "users",
        timestamps: true,
    })
], User);
export default User;
//# sourceMappingURL=User.model.js.map