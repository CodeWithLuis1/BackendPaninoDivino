import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from "../models/adminModels/User.model.js";
import Role from "../models/adminModels/Role.model.js";
import Category from "../models/Category.model.js";
import Client from "../models/Client.model.js";
import ExtraIngredients from "../models/ExtraIngredients.model.js";
import Ingredient from "../models/Ingredient.model.js";
import Product from "../models/Product.model.js";
import ProductExtraIngredient from "../models/ProductExtraIngredient.model.js";
import ProductSauce from "../models/ProductSauce.model.js";
import ProductVariation from "../models/ProductVariation.model.js";
import Sauce from "../models/Sauce.model.js";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!,{
    models: [join(__dirname, '../models/*.ts')]
})
 db.addModels([User,Role,Category,Client,ExtraIngredients,Ingredient,Product,ProductExtraIngredient,ProductSauce,ProductVariation,Sauce]);
export default db