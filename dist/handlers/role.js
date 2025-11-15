import Role from "../models/adminModels/Role.model.js";
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "El nombre del rol es obligatorio." });
        }
        const existingRole = await Role.findOne({ where: { name } });
        if (existingRole) {
            return res.status(400).json({ error: "El rol ya existe." });
        }
        const role = await Role.create({ name });
        return res.status(201).json({
            statusCode: 201,
            message: "Rol creado exitosamente.",
            data: role,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al crear el rol." });
    }
};
// Update an existing role
export const updateRole = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating role" });
    }
};
// Delete a role
export const deleteRole = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting role" });
    }
};
export const getRoles = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        let roles;
        let total;
        let lastPage = 1;
        if (limit) {
            const offset = (page - 1) * limit;
            total = await Role.count();
            roles = await Role.findAll({
                limit,
                offset,
                order: [["id", "ASC"]],
            });
            lastPage = Math.ceil(total / limit);
        }
        else {
            roles = await Role.findAll({ order: [["id", "ASC"]] });
            total = roles.length;
        }
        res.json({
            statusCode: 200,
            response: roles,
            page,
            total,
            lastPage,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching roles" });
    }
};
//# sourceMappingURL=role.js.map