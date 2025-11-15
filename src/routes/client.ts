import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";

import { 
  createClient, 
  getAllClients, 
  getClientById 
} from "../handlers/clientHandler.js";

const clientRouter = Router();

// =====================================================
//  GET ALL CLIENTS
// =====================================================
clientRouter.get("/", getAllClients);

// =====================================================
//  GET CLIENT BY ID
// =====================================================
clientRouter.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getClientById
);

// =====================================================
//  CREATE CLIENT
// =====================================================
clientRouter.post(
  "/",
  body("client_name")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  handleInputErrors,
  createClient
);

export default clientRouter;
