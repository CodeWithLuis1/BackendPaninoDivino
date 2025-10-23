// src/seed/defaultRole.ts
import Role from "../models/adminModels/Role.model.js";

export const createDefaultRoles = async () => {
  const roles = ["admin"]; 

  for (const name of roles) {
    const [role, created] = await Role.findOrCreate({
      where: { name },
      defaults: { name },
    });

    if (created) {
      console.log(` Rol '${name}' creado`);
    }
  }
};
