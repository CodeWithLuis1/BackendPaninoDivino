import { Request, Response } from "express";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";
import ProductIngredientLink from "../models/ProductIngredientLink.model.js";
import MenuIngredient from "../models/MenuIngredient.model.js";


export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, image, active, id_category,price } = req.body;
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
      price
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

// This endpoint retrieves a product along with all its associated ingredient configurations, grouping them into base and extra categories for easier client-side customization. It loads the product, joins its ingredient links and the corresponding ingredient details, formats the data, and returns a structured response containing product information plus separate lists of base ingredients and optional extras.
export const getProductFull = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar producto con sus relaciones de ingredientes
      const product = await Product.findByPk(id, {
        include: [
          {
            model: ProductIngredientLink,
            as: "productIngredientLinks",
            include: [
              { model: MenuIngredient, as: "linkedIngredient" }
            ]
          }
        ]
      });


    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    }

    // Separar base y extra
    const ingredients_base = [];
    const ingredients_extra = [];

    for (const link of product.productIngredientLinks) {
      const ingredient = link.linkedIngredient;

      const formatted = {
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        ingredient_role: link.ingredient_role,
        is_default_selected: link.is_default_selected,
        is_removable: link.is_removable,
        additional_price: Number(link.additional_price),
        is_active: link.is_active
      };

      if (link.ingredient_role === "base") {
        ingredients_base.push(formatted);
      } else {
        ingredients_extra.push(formatted);
      }
    }

    return res.json({
      statusCode: 200,
      data: {
        product: {
          id_product: product.id_product,
          name: product.name,
          description: product.description,
          image: product.image,
          price: Number(product.price),
          active: product.active
        },
        ingredients_base,
        ingredients_extra
      }
    });

  } catch (error: any) {
    console.error("Error en getProductFull:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al obtener datos completos del producto",
      error: error.message,
    });
  }
};

export const getProductIngredients = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: [
          {
            model: ProductIngredientLink,
            as: "productIngredientLinks",
            include: [
              { model: MenuIngredient, as: "linkedIngredient" }
            ]
          }
        ]
      });


    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Producto no encontrado",
      });
    }

    const ingredients = product.productIngredientLinks.map((link) => ({
      id_ingredient: link.ingredient_id,
      ingredient_name: link.linkedIngredient.ingredient_name,
      ingredient_role: link.ingredient_role, // 'base' | 'extra'
      is_default_selected: link.is_default_selected,
      is_removable: link.is_removable,
      additional_price: Number(link.additional_price),
      is_active: link.is_active,
    }));

    return res.json({
      statusCode: 200,
      data: {
        id_product: product.id_product,
        name: product.name,
        price: Number(product.price),
        ingredients,
      },
    });

  } catch (error: any) {
    console.error("Error en getProductIngredients:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error al obtener los ingredientes del producto",
      error: error.message,
    });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, image, active, id_category,price } = req.body;
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
      price: price ?? product.price,
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
