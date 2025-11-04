import { Request, Response } from "express";
import Ingredient from "../models/Ingredient.model.js";
import Product from "../models/Product.model.js";

/* -----------------------------------------------------
   🟢 Crear ingrediente(s) asociados a un producto
----------------------------------------------------- */
export const createIngredients = async (req: Request, res: Response) => {
  try {
    const { id_product, ingredients } = req.body;

    // Validar producto
    const product = await Product.findByPk(id_product);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    }

    //Permitir tanto un solo objeto como un array
    const ingredientsArray = Array.isArray(ingredients)
      ? ingredients
      : ingredients
      ? [ingredients]
      : [];

    if (ingredientsArray.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Debe enviar al menos un ingrediente válido",
      });
    }

    // Crear ingredientes
    const createdIngredients = await Promise.all(
      ingredientsArray.map(async (ing) =>
        Ingredient.create({
          id_product,
          name: ing.name,
          quantity_per_product: ing.quantity_per_product ?? null,
          unit: ing.unit ?? null,
          track_in_inventory: ing.track_in_inventory ?? false,
        })
      )
    );

    res.status(201).json({
      statusCode: 201,
      message: "Ingredientes agregados correctamente",
      data: createdIngredients,
    });
  } catch (error: any) {
    console.error("Error al crear ingredientes:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al crear ingredientes",
      error: error.message,
    });
  }
};


/* -----------------------------------------------------
   🟡 Obtener ingredientes por producto
----------------------------------------------------- */
export const getIngredientsByProduct = async (req: Request, res: Response) => {
  try {
    const { id_product } = req.params;

    const ingredients = await Ingredient.findAll({
      where: { id_product },
      order: [["id_ingredient", "ASC"]],
    });

    res.json({
      statusCode: 200,
      data: ingredients,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al obtener los ingredientes",
      error: error.message,
    });
  }
};
