import Client from "../models/Client.model.js";
export const createClient = async (req, res) => {
    try {
        const { client_name } = req.body;
        // Validar campos obligatorios
        if (!client_name) {
            return res.status(400).json({
                statusCode: 400,
                message: "El nombre del cliente es obligatorio",
            });
        }
        // Verificar si ya existe
        const existing = await Client.findOne({
            where: { client_name },
        });
        if (existing) {
            return res.status(400).json({
                statusCode: 400,
                message: "El cliente ya existe en el sistema",
            });
        }
        // Crear
        const client = await Client.create({
            client_name,
        });
        return res.status(201).json({
            statusCode: 201,
            message: "Cliente creado correctamente",
            data: client,
        });
    }
    catch (error) {
        console.error("Error al crear cliente:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Error al crear cliente",
            error: error.message,
        });
    }
};
export const getAllClients = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        let clients;
        let total;
        let lastPage = 1;
        if (limit !== null) {
            const offset = (page - 1) * limit;
            total = await Client.count();
            clients = await Client.findAll({
                limit,
                offset,
                order: [["id_client", "ASC"]],
            });
            lastPage = Math.ceil(total / limit);
        }
        else {
            clients = await Client.findAll({
                order: [["id_client", "ASC"]],
            });
            total = clients.length;
        }
        return res.json({
            statusCode: 200,
            data: clients,
            total,
            limit,
            lastPage,
        });
    }
    catch (error) {
        console.error("Error al obtener clientes:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Error al obtener clientes",
            error: error.message,
        });
    }
};
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        // Buscar cliente
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({
                statusCode: 404,
                message: "Cliente no encontrado",
            });
        }
        return res.json({
            statusCode: 200,
            data: client,
        });
    }
    catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Error al obtener cliente por ID",
            error: error.message,
        });
    }
};
//# sourceMappingURL=clientHandler.js.map