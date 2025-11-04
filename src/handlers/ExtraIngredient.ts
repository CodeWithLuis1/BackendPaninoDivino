import { Request, Response } from "express";
import ExtraIngredient from "../models/ExtraIngredients.model.js";
import ProductExtraIngredient from "../models/ProductExtraIngredient.model.js";

/* -----------------------------------------------------
   Crear un nuevo ingrediente extra
----------------------------------------------------- */
export const createExtraIngredient = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Si es un array → crear en lote
    if (Array.isArray(body)) {
      if (body.length === 0) {
        return res.status(400).json({
          statusCode: 400,
          message: "Debe enviar al menos un ingrediente extra.",
        });
      }

      const created = await ExtraIngredient.bulkCreate(body);
      return res.status(201).json({
        statusCode: 201,
        message: "Ingredientes extra creados correctamente.",
        data: created,
      });
    }

    // Si es un solo ingrediente
    const { name, price, quantity_per_use, unit, track_in_inventory } = body;
    if (!name || !price) {
      return res.status(400).json({
        statusCode: 400,
        message: "El nombre y el precio son obligatorios.",
      });
    }

    const newExtra = await ExtraIngredient.create({
      name,
      price,
      quantity_per_use: quantity_per_use ?? null,
      unit: unit ?? null,
      track_in_inventory: track_in_inventory ?? false,
    });

    res.status(201).json({
      statusCode: 201,
      message: "Ingrediente extra creado correctamente.",
      data: newExtra,
    });
  } catch (error: any) {
    console.error("Error al crear extra ingredient:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al crear el ingrediente extra",
      error: error.message,
    });
  }
};


/* -----------------------------------------------------
   Obtener todos los ingredientes extra
----------------------------------------------------- */
export const getExtraIngredients = async (req: Request, res: Response) => {
  try {
    const extras = await ExtraIngredient.findAll({
      order: [["id_extra_ingredient", "ASC"]],
    });

    res.json({
      statusCode: 200,
      data: extras,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al obtener los ingredientes extra",
      error: error.message,
    });
  }
};

/* -----------------------------------------------------
   🟣 Relacionar extras con un producto
----------------------------------------------------- */
export const assignExtrasToProduct = async (req: Request, res: Response) => {
  try {
    const { id_product, extra_ids } = req.body;

    if (!id_product || !Array.isArray(extra_ids) || extra_ids.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Debe enviar el id del producto y un arreglo de extras válidos",
      });
    }

    // Elimina las relaciones previas
    await ProductExtraIngredient.destroy({ where: { id_product } });

    // Crea nuevas relaciones
    const created = await Promise.all(
      extra_ids.map((id_extra_ingredient) =>
        ProductExtraIngredient.create({ id_product, id_extra_ingredient })
      )
    );

    res.status(201).json({
      statusCode: 201,
      message: "Extras asignados correctamente al producto",
      data: created,
    });
  } catch (error: any) {
    console.error("Error al asignar extras:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al asignar los extras al producto",
      error: error.message,
    });
  }
};

/* -----------------------------------------------------
   Obtener extras asociados a un producto
----------------------------------------------------- */
export const getExtrasByProduct = async (req: Request, res: Response) => {
  try {
    const { id_product } = req.params;

    const extras = await ProductExtraIngredient.findAll({
      where: { id_product },
      include: [{ model: ExtraIngredient }],
    });

    res.json({
      statusCode: 200,
      data: extras,
    });
  } catch (error: any) {
    console.error("Error al obtener extras del producto:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al obtener los extras del producto",
      error: error.message,
    });
  }
};
