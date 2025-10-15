// seed/defaultUser.ts
import User from "../models/User.model.js";
import Role from "../models/Role.model.js";

export async function createDefaultUser() {
  // Creamos roles básicos si no existen
  const [adminRole] = await Role.findOrCreate({
    where: { name: "admin" },
    defaults: { name: "admin" },
  });

  // Verificamos si ya existe el usuario Panino divino
  const existingUser = await User.findOne({
    where: { username: "admin" },
  });

  if (!existingUser) {
    await User.create({
      username: "admin",
      password: "admin", // se hashea automáticamente
      roleId: adminRole.id,
    });
    console.log(" Usuario por defecto creado.");
  } else {
    console.log("ℹUsuario por defecto ya existe.");
  }
}
