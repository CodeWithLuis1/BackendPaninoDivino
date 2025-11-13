import { Request, Response } from "express";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, image, active, id_category } = req.body;
    // Validar categoría
    const category = await Category.findByPk(id_category);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        message: "Categoría no encontrada",
      });
    }
    // Validar imagen: acepta Base64 o URL
    if (image) {
      const isBase64 =
        /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(
          image
        );
      const isUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(image);
      if (!isBase64 && !isUrl) {
        return res.status(400).json({
          statusCode: 400,
          message: "La imagen debe ser una URL válida o Base64",
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      image,
      active: active ?? true,
      id_category,
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Producto creado correctamente",
      data: product,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al crear el producto",
      error: error.message,
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
    let products;
    let total;
    let lastPage = 1;
    if (limit !== null) {
      const offset = (page - 1) * limit;
      total = await Product.count();
      products = await Product.findAll({
        limit,
        offset,
        order: [["id_product", "ASC"]],
        include: ["category", "productIngredientLinks"],
      });
      lastPage = Math.ceil(total / limit);
    } else {
      products = await Product.findAll({
        order: [["id_product", "ASC"]],
        include: ["category", "productIngredientLinks"],
      });
      total = products.length;
    }
    res.json({
      statusCode: 200,
      data: products,
      total,
      limit,
      lastPage,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
    include: ["category", "productIngredientLinks"],
    });
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    }
    res.json({
      statusCode: 200,
      data: product,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al obtener el producto",
      error: error.message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, image, active, id_category } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    }
    if (id_category) {
      const category = await Category.findByPk(id_category);
      if (!category) {
        return res.status(404).json({
          statusCode: 404,
          message: "Categoría no encontrada",
        });
      }
    }
    // Validar imagen: acepta Base64 o URL
    if (image) {
      const isBase64 =
        /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(
          image
        );
      const isUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(image);
      if (!isBase64 && !isUrl) {
        return res.status(400).json({
          statusCode: 400,
          message: "La imagen debe ser una URL válida o Base64",
        });
      }
    }

    await product.update({
      name: name ?? product.name,
      description: description ?? product.description,
      image: image ?? product.image,
      active: active ?? product.active,
      id_category: id_category ?? product.id_category,
    });
    res.json({
      statusCode: 200,
      message: "Producto actualizado correctamente",
      data: product,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    }
    await product.destroy();
    res.json({
      statusCode: 200,
      message: "Producto eliminado correctamente",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};
