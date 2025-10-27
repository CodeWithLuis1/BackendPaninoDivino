import { Request, Response } from "express";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        statusCode: 400,
        error: "El nombre de la categoría es obligatorio",
      });
    }
    // Check if category already exists
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(409).json({
        statusCode: 409,
        error: "La categoría ya existe",
      });
    }
    // Create category
    await Category.create({ name });
    return res.status(200).json({
      statusCode: 200,
      message: "Categoría creada correctamente",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      error: "Error al crear la categoría",
      details: error.message,
    });
  }
};

// Get all categories (optional pagination)
export const getCategories = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
    let categories;
    let total;
    let lastPage = 1;
    if (limit !== null) {
      const offset = (page - 1) * limit;
      total = await Category.count();
      categories = await Category.findAll({
        limit,
        offset,
        order: [["id_category", "ASC"]],
        include: [{ model: Product, as: "products" }],
      });
      lastPage = Math.ceil(total / limit);
    } else {
      categories = await Category.findAll({
        order: [["id_category", "ASC"]],
        include: [{ model: Product, as: "products" }],
      });
      total = categories.length;
    }
    res.json({
      statusCode: 200,
      data: categories,
      total,
      limit,
      lastPage,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al obtener las categorías",
      details: error.message,
    });
  }
};

// Get category by ID (includes products)
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        error: "Categoría no encontrada",
      });
    }
    res.json({
      statusCode: 200,
      data: category,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al obtener la categoría",
      details: error.message,
    });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        message: "Categoría no encontrada",
      });
    }
    // Prevent duplicate names
    if (name && name !== category.name) {
      const exists = await Category.findOne({ where: { name } });
      if (exists) {
        return res.status(409).json({
          statusCode: 409,
          message: "Ya existe una categoría con ese nombre",
        });
      }
    }

    await category.update({ name: name ?? category.name });
    res.json({
      statusCode: 200,
      message: "Categoría actualizada correctamente",
      data: category,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar la categoría",
      error: error.message,
    });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        message: "Categoría no encontrada",
      });
    }
    // Prevent deleting if it has related products
    if (category.products && category.products.length > 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "No se puede eliminar una categoría con productos asociados",
      });
    }
    await category.destroy();
    res.json({
      statusCode: 200,
      message: "Categoría eliminada correctamente",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al eliminar la categoría",
      error: error.message,
    });
  }
};
