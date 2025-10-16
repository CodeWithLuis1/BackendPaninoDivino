// handlers/role.ts
import { Request, Response } from "express";
import Role from "../models/Role.model.js";

// Create a new role
export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Basic validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Role name is required" });
    }

    // Avoid duplicates
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ error: "Role already exists" });
    }

    const role = await Role.create({ name });

    return res.status(201).json({
      statusCode: 201,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating role" });
  }
};

// Update an existing role
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Role name is required" });
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Avoid duplicates
    const duplicate = await Role.findOne({ where: { name } });
    if (duplicate && duplicate.id !== parseInt(id)) {
      return res.status(400).json({ error: "Another role with this name already exists" });
    }

    await role.update({ name });

    res.json({
      statusCode: 200,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating role" });
  }
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    await role.destroy();

    res.json({
      statusCode: 200,
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting role" });
  }
};


// List all roles with pagination
export const getRoles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Count total roles
    const total = await Role.count();

    // Get roles with limit & offset
    const roles = await Role.findAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    const lastPage = Math.ceil(total / limit);

    // Return JSON with 'response' key
    res.json({
      statusCode: 200,
      response: roles, // este es el cambio clave
      page,
      total,
      lastPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching roles" });
  }
};
