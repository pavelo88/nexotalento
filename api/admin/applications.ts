import { createAdminListHandler } from "../../src/server/serverless-admin.js";
import { listAdminApplications } from "../../src/server/firestore-repository.js";

export default createAdminListHandler(listAdminApplications, "Bandeja de postulaciones no disponible hasta configurar Firebase Admin.");
