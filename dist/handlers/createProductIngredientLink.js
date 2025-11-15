import Product from "../models/Product.model.js";
import MenuIngredient from "../models/MenuIngredient.model.js";
import ProductIngredientLink from "../models/ProductIngredientLink.model.js";
export const createMultipleProductIngredientLinks = async (req, res) => {
    try {
        const { product_id, ingredients } = req.body;
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Debe enviar al menos un ingrediente",
            });
        }
        // Validar producto
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                statusCode: 404,
                message: "El producto no existe",
            });
        }
        let rows = [];
        for (const ing of ingredients) {
            const validIngredient = await MenuIngredient.findByPk(ing.ingredient_id);
            if (!validIngredient) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `El ingrediente ${ing.ingredient_id} no existe`,
                });
            }
            rows.push({
                product_id,
                ingredient_id: ing.ingredient_id,
                ingredient_role: ing.ingredient_role,
                is_default_selected: ing.is_default_selected ?? false,
                is_removable: ing.is_removable ?? true,
                additional_price: ing.additional_price ?? 0,
                is_active: ing.is_active ?? true
            });
        }
        const created = await ProductIngredientLink.bulkCreate(rows);
        return res.status(201).json({
            statusCode: 201,
            message: "Ingredientes asociados al producto exitosamente",
            data: created
        });
    }
    catch (error) {
        console.error("Error al relacionar ingredientes:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Error al relacionar ingredientes con el producto",
            error: error.message,
        });
    }
};
//# sourceMappingURL=createProductIngredientLink.js.map