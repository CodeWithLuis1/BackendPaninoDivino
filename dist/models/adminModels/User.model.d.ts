import { Model } from "sequelize-typescript";
import Role from "./Role.model.js";
declare class User extends Model {
    name: string;
    username: string;
    password: string;
    roleId: number;
    role: Role;
    static hashPassword(user: User): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
export default User;
