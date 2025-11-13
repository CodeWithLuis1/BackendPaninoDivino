import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from "../models/adminModels/User.model.js";
import Role from "../models/adminModels/Role.model.js";
import Category from "../models/Category.model.js";
import Client from "../models/Client.model.js";
import Product from "../models/Product.model.js";
import ProductIngredientLink from "../models/ProductIngredientLink.model.js";
import MenuIngredient from "../models/MenuIngredient.model.js";



dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!,{
    models: [join(__dirname, '../models/*.ts')]
})
 db.addModels([User,Role,Category,Client,Product,ProductIngredientLink,MenuIngredient]);
export default db