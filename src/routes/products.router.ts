import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/index.js';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../handlers/products.js';

const productRouter = Router();

// Obtener todos los productos
productRouter.get('/', getProducts);

// Obtener producto por ID
productRouter.get('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById
);

// Crear producto
productRouter.post('/',
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres'),

  body('categoria')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isString().withMessage('La categoría debe ser texto')
    .isLength({ max: 50 }).withMessage('La categoría no puede superar los 50 caracteres'),

  body('costoCompra')
    .notEmpty().withMessage('El costo de compra es obligatorio')
    .isDecimal().withMessage('El costo de compra debe ser un número decimal'),

  body('precioVenta')
    .notEmpty().withMessage('El precio de venta es obligatorio')
    .isDecimal().withMessage('El precio de venta debe ser un número decimal'),

  body('unidadMedida')
    .notEmpty().withMessage('La unidad de medida es obligatoria')
    .isString().withMessage('La unidad de medida debe ser texto')
    .isLength({ max: 20 }).withMessage('La unidad de medida no puede superar los 20 caracteres'),

  body('activo')
    .optional()
    .isBoolean().withMessage('El campo activo debe ser booleano'),

  body('fechaCreacion')
    .notEmpty().withMessage('La fecha de creación es obligatoria')
    .isISO8601().withMessage('La fecha de creación debe estar en formato válido (YYYY-MM-DD)'),

  handleInputErrors,
  createProduct
);

// Actualizar producto
productRouter.put('/:id',
  param('id').isInt().withMessage('ID no válido'),

  body('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres'),

  body('categoria')
    .optional()
    .isString().withMessage('La categoría debe ser texto')
    .isLength({ max: 50 }).withMessage('La categoría no puede superar los 50 caracteres'),

  body('costoCompra')
    .optional()
    .isDecimal().withMessage('El costo de compra debe ser un número decimal'),

  body('precioVenta')
    .optional()
    .isDecimal().withMessage('El precio de venta debe ser un número decimal'),

  body('unidadMedida')
    .optional()
    .isString().withMessage('La unidad de medida debe ser texto')
    .isLength({ max: 20 }).withMessage('La unidad de medida no puede superar los 20 caracteres'),

  body('activo')
    .optional()
    .isBoolean().withMessage('El campo activo debe ser booleano'),

  body('fechaCreacion')
    .optional()
    .isISO8601().withMessage('La fecha de creación debe estar en formato válido (YYYY-MM-DD)'),

  handleInputErrors,
  updateProduct
);

// Eliminar producto
productRouter.delete('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
);

export default productRouter;
