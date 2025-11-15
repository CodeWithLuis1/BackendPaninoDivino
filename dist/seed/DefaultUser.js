// seed/defaultUser.ts
import User from "../models/adminModels/User.model.js";
import Role from "../models/adminModels/Role.model.js";
export const createDefaultUser = async () => {
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    if (!adminRole) {
        console.error("No existe el rol 'admin'. Crea los roles antes de los usuarios.");
        return;
    }
    // Evitar duplicados
    const adminExists = await User.findOne({ where: { username: "admin" } });
    if (adminExists)
        return;
    await User.create({
        name: "Administrador",
        username: "admin",
        password: "admin", // <- texto plano, el hook lo hashea
        roleId: adminRole.id,
    });
    console.log("Usuario admin creado correctamente");
};
//# sourceMappingURL=DefaultUser.js.map