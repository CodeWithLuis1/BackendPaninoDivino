import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Modelos
import User from "../models/adminModels/User.model.js";
import Role from "../models/adminModels/Role.model.js";
import Category from "../models/Category.model.js";
import Client from "../models/Client.model.js";
import Product from "../models/Product.model.js";
import ProductIngredientLink from "../models/ProductIngredientLink.model.js";
import MenuIngredient from "../models/MenuIngredient.model.js";
import Order from "../models/Order.model.js";
import Payment from "../models/Payment.model.js";
import OrderItemIngredient from "../models/OrderItemIngredient.model.js";

dotenv.config();

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar Sequelize como en el primer ejemplo
const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [join(__dirname, "../models")],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario en Render
    },
  },
  logging: false,
});

// Registrar modelos manualmente (evita problemas en producción)
db.addModels([
  User,
  Role,
  Category,
  Client,
  Product,
  ProductIngredientLink,
  MenuIngredient,
  Order,
  Payment,
  OrderItemIngredient,
]);

// Aquí defines asociaciones igual que en tu otro proyecto

// Ejemplo de relaciones (ajusta si ya existen en tus modelos):
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// Product - Ingredients
Product.hasMany(ProductIngredientLink, { foreignKey: "productId" });
ProductIngredientLink.belongsTo(Product, { foreignKey: "productId" });

MenuIngredient.hasMany(ProductIngredientLink, { foreignKey: "ingredientId" });
ProductIngredientLink.belongsTo(MenuIngredient, { foreignKey: "ingredientId" });

// Order - OrderItems - Ingredients
Order.hasMany(OrderItemIngredient, { foreignKey: "orderId" });
OrderItemIngredient.belongsTo(Order, { foreignKey: "orderId" });

// Order - Payment
Order.hasOne(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

// Client - Orders
Client.hasMany(Order, { foreignKey: "clientId" });
Order.belongsTo(Client, { foreignKey: "clientId" });

export default db;
