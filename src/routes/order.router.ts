import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/index.js'
import { OrderController } from '../handlers/order.js'

const orderRouter = Router()

// Obtener todas las órdenes
orderRouter.get('/', OrderController.getOrders)

// Obtener orden por ID
orderRouter.get(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  OrderController.getOrderById
)

// Crear orden
orderRouter.post(
  '/',
  body('tableNumber')
    .notEmpty().withMessage('El número de mesa es obligatorio')
    .isString().withMessage('El número de mesa debe ser texto')
    .isLength({ max: 10 }).withMessage('El número de mesa no puede superar los 10 caracteres'),
  body('customerName')
    .optional()
    .isString().withMessage('El nombre del cliente debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre del cliente no puede superar los 100 caracteres'),
  body('waiter')
    .notEmpty().withMessage('El nombre del mesero es obligatorio')
    .isString().withMessage('El nombre del mesero debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre del mesero no puede superar los 100 caracteres'),
  body('priority')
    .isIn(['low', 'normal', 'urgent']).withMessage('La prioridad no es válida'),
  body('specialInstructions')
    .optional()
    .isString().withMessage('Las instrucciones deben ser texto'),
  handleInputErrors,
  OrderController.createOrder
)

// Actualizar orden
orderRouter.put(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  body('tableNumber')
    .optional()
    .isString().withMessage('El número de mesa debe ser texto')
    .isLength({ max: 10 }).withMessage('El número de mesa no puede superar los 10 caracteres'),
  body('customerName')
    .optional()
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres'),
  body('waiter')
    .optional()
    .isString().withMessage('El nombre del mesero debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre del mesero no puede superar los 100 caracteres'),
  body('priority')
    .optional()
    .isIn(['low', 'normal', 'urgent']).withMessage('La prioridad no es válida'),
  body('specialInstructions')
    .optional()
    .isString().withMessage('Las instrucciones deben ser texto'),
  handleInputErrors,
  OrderController.updateOrder
)

// Eliminar orden
orderRouter.delete(
  '/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  OrderController.deleteOrder
)

export default orderRouter
