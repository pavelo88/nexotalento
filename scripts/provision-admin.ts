import { getFirebaseAdminAuth } from "../src/server/firebase-admin";

const email = process.argv[2]?.trim().toLowerCase();

if (!email || !email.includes("@")) {
  console.error("Uso: tsx scripts/provision-admin.ts correo@dominio.com");
  process.exitCode = 1;
} else {
  try {
    const auth = getFirebaseAdminAuth();
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true, role: "admin" });
    console.log("Permisos administrativos asignados. La persona debe volver a iniciar sesión para actualizar el token.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido.";
    console.error(`No se asignaron permisos: ${message}`);
    process.exitCode = 1;
  }
}
