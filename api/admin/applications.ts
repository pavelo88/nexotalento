import { createAdminListHandler } from "../../src/server/serverless-admin";
import { listAdminApplications } from "../../src/server/firestore-repository";

export default createAdminListHandler(listAdminApplications, "Bandeja de postulaciones no disponible hasta configurar Firebase Admin.");
