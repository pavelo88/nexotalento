import { createAdminListHandler } from "../../src/server/serverless-admin";
import { listAdminLeads } from "../../src/server/firestore-repository";

export default createAdminListHandler(listAdminLeads, "Bandeja de leads no disponible hasta configurar Firebase Admin.");
