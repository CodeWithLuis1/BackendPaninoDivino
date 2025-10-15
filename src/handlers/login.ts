// handlers/auth.ts
import { Request, Response } from "express";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, include: ["role"] });

    if (!user) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role?.name,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    return res.json({
      statusCode: 200,
      id: user.id,
      name: user.username,
      username: user.username,
      role: user.role?.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};
