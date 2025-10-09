import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Ejecutar validaciones
  const errors = validationResult(req);

  console.log("📥 Validating body:", req.body);
  console.log("📛 Validation errors:", errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
