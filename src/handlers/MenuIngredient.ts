import { Request, Response } from "express";
import MenuIngredient from "../models/MenuIngredient.model.js";

export const createMenuIngredient = async (req: Request, res: Response) => {
  try {
    const { ingredient_name, is_active } = req.body;

    const existing = await MenuIngredient.findOne({
      where: { ingredient_name },
    });

    if (existing) {
      return res.status(400).json({
        statusCode: 400,
        message: "El ingrediente ya existe en el catálogo",
      });
    }

    const ingredient = await MenuIngredient.create({
      ingredient_name,
      is_active: is_active ?? true,
    });

    res.status(201).json({
      statusCode: 201,
      message: "Ingrediente creado correctamente",
      data: ingredient,
    });
  } catch (error: any) {
    console.error("Error al crear ingrediente:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al crear ingrediente",
      error: error.message,
    });
  }
};

export const getAllMenuIngredients = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : null;

    let ingredients;
    let total;
    let lastPage = 1;

    if (limit !== null) {
      const offset = (page - 1) * limit;

      total = await MenuIngredient.count();

      ingredients = await MenuIngredient.findAll({
        limit,
        offset,
        order: [["ingredient_id", "ASC"]],
      });

      lastPage = Math.ceil(total / limit);
    } else {
      ingredients = await MenuIngredient.findAll({
        order: [["ingredient_id", "ASC"]],
      });
      total = ingredients.length;
    }

    return res.json({
      statusCode: 200,
      data: ingredients,
      total,
      limit,
      lastPage,
    });
  } catch (error: any) {
    console.error("Error al obtener ingredientes:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al obtener ingredientes",
      error: error.message,
    });
  }
};
