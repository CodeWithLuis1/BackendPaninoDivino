import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/index.js'
import { createContract, getContracts, getContractById, updateContract, deleteContract } from '../handlers/contract.js'

const contractRouter = Router()

// Obtener todos
contractRouter.get('/', getContracts)

// Obtener por ID
contractRouter.get('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getContractById
)

// Crear contrato
contractRouter.post('/',
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio')
    .isString().withMessage('El nombre del cliente debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre del cliente no puede superar los 100 caracteres'),

  body('service')
    .notEmpty().withMessage('El servicio es obligatorio')
    .isString().withMessage('El servicio debe ser texto')
    .isLength({ max: 100 }).withMessage('El servicio no puede superar los 100 caracteres'),

  body('status')
    .optional()
    .isIn(['Pendiente de Documentos', 'Contrato enviado', 'Reunión inicial programada', 'Proceso finalizado'])
    .withMessage('El estado no es válido'),

  body('date')
    .notEmpty().withMessage('La fecha es obligatoria')
    .isISO8601().withMessage('La fecha debe estar en formato válido (YYYY-MM-DD)'),

  body('createdBy')
    .notEmpty().withMessage('El campo createdBy es obligatorio')
    .isInt().withMessage('createdBy debe ser un número entero'),

  handleInputErrors,
  createContract
)

// Actualizar contrato
contractRouter.put('/:id',
  param('id').isInt().withMessage('ID no válido'),

  body('clientName')
    .optional()
    .isString().withMessage('El nombre del cliente debe ser texto')
    .isLength({ max: 100 }).withMessage('El nombre del cliente no puede superar los 100 caracteres'),

  body('service')
    .optional()
    .isString().withMessage('El servicio debe ser texto')
    .isLength({ max: 100 }).withMessage('El servicio no puede superar los 100 caracteres'),

  body('status')
    .optional()
    .isIn(['Pendiente de Documentos', 'Contrato enviado', 'Reunión inicial programada', 'Proceso finalizado'])
    .withMessage('El estado no es válido'),

  body('date')
    .optional()
    .isISO8601().withMessage('La fecha debe estar en formato válido (YYYY-MM-DD)'),

  body('createdBy')
    .optional()
    .isInt().withMessage('createdBy debe ser un número entero'),

  handleInputErrors,
  updateContract
)

// Eliminar contrato
contractRouter.delete('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteContract
)

export default contractRouter
