import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from "../models/User.model.js";
import Contract from "../models/Contract.model.js";
import Order from "../models/Order.model.js";
import OrderItem from "../models/OrderItem.model.js";
import Product from "../models/Products.model.js";
import Role from "../models/Role.model.js";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!,{
    models: [join(__dirname, '../models/*.ts')]
})
 db.addModels([User, Contract, Order,OrderItem,Product,Role]);
export default db