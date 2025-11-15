import User from "../models/adminModels/User.model.js";
import Role from "../models/adminModels/Role.model.js";
export const createUser = async (req, res) => {
    try {
        const { name, username, password, roleId } = req.body;
        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            return res.status(409).json({
                statusCode: 409,
                error: "El nombre de usuario ya existe",
            });
        }
        await User.create({
            name,
            username,
            password,
            roleId: roleId,
        });
        return res.status(200).json({
            statusCode: 200,
            message: "Usuario Creado Correctamente",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            error: "Error al crear el usuario",
            details: error.message,
        });
    }
};
export const getUser = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        let users;
        let total;
        let lastPage = 1;
        if (limit !== null) {
            const offset = (page - 1) * limit;
            total = await User.count();
            users = await User.findAll({
                limit,
                offset,
                order: [["id", "ASC"]],
                include: [{
                        model: Role,
                        attributes: ['name']
                    }],
            });
            lastPage = Math.ceil(total / limit);
        }
        else {
            users = await User.findAll({ order: [["id", "ASC"]],
                include: [
                    {
                        model: Role,
                        attributes: ["name"],
                    },
                ],
            });
            total = users.length;
        }
        res.json({
            statusCode: 200,
            data: users,
            total,
            limit,
            lastPage,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            error: "Error al obtener los usuarios",
            details: error.message,
        });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { include: ["role"] });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "Usuario no encontrado",
            });
        }
        res.json({
            statusCode: 200,
            data: user,
        });
    }
    catch (error) {
        console.error(error); //This line is very important to debug the error in the server console
        res.status(500).json({
            statusCode: 500,
            message: "Error al obtener el usuario",
            error: error.message,
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, password, role_id } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "Usuario no encontrado",
            });
        }
        // Evitar duplicados al actualizar username
        if (username && username !== user.username) {
            const userExists = await User.findOne({ where: { username } });
            if (userExists) {
                return res.status(409).json({
                    statusCode: 409,
                    message: "El nombre de usuario ya existe",
                });
            }
        }
        await user.update({
            name: name ?? user.name,
            username: username ?? user.username,
            password: password ?? user.password,
            roleId: role_id ?? user.roleId,
        });
        res.json({
            statusCode: 200,
            message: "Usuario actualizado correctamente",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Error al actualizar el usuario",
            error: error.message,
        });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "Usuario no encontrado",
            });
        }
        await user.destroy();
        res.json({
            statusCode: 200,
            message: "Usuario eliminado correctamente",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Error al eliminar el usuario",
            error: error.message,
        });
    }
};
//# sourceMappingURL=user.js.map