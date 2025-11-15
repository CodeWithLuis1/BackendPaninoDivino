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
import OrderItem from "../models/OrderItem.modal.js";
import OrderItemIngredient from "../models/OrderItemIngredient.model.js";
dotenv.config();
// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Inicializar Sequelize
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    models: [join(__dirname, "../models")],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});
// Registrar modelos manualmente
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
    OrderItem,
    OrderItemIngredient,
]);
// ****************************************
// 🔗 TODAS LAS ASOCIACIONES DEFINIDAS AQUÍ
// ****************************************
// Role → User
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });
// Category → Product
Category.hasMany(Product, { foreignKey: "id_category", as: "products" });
Product.belongsTo(Category, { foreignKey: "id_category", as: "category" });
// Product → ProductIngredientLink
Product.hasMany(ProductIngredientLink, {
    foreignKey: "product_id",
    as: "productIngredientLinks",
});
ProductIngredientLink.belongsTo(Product, {
    foreignKey: "product_id",
    as: "linkedProduct",
});
// Ingredient → ProductIngredientLink
MenuIngredient.hasMany(ProductIngredientLink, {
    foreignKey: "ingredient_id",
    as: "ingredientLinks",
});
ProductIngredientLink.belongsTo(MenuIngredient, {
    foreignKey: "ingredient_id",
    as: "linkedIngredient",
});
// Order → OrderItem
Order.hasMany(OrderItem, { foreignKey: "id_order", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "id_order", as: "order" });
// OrderItem → Product
OrderItem.belongsTo(Product, { foreignKey: "id_product", as: "product" });
// OrderItem → OrderItemIngredient
OrderItem.hasMany(OrderItemIngredient, {
    foreignKey: "id_order_item",
    as: "ingredients",
});
OrderItemIngredient.belongsTo(OrderItem, {
    foreignKey: "id_order_item",
    as: "orderItem",
});
// MenuIngredient → OrderItemIngredient
MenuIngredient.hasMany(OrderItemIngredient, {
    foreignKey: "id_ingredient",
    as: "ingredientItems",
});
OrderItemIngredient.belongsTo(MenuIngredient, {
    foreignKey: "id_ingredient",
    as: "ingredient",
});
// Order → Payment
Order.hasOne(Payment, { foreignKey: "id_order", as: "payment" });
Payment.belongsTo(Order, { foreignKey: "id_order", as: "order" });
// Client → Orders
Client.hasMany(Order, { foreignKey: "id_client", as: "orders" });
Order.belongsTo(Client, { foreignKey: "id_client", as: "client" });
export default db;
//# sourceMappingURL=db.js.map