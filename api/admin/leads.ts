import { createAdminListHandler } from "../../src/server/serverless-admin.js";
import { listAdminLeads } from "../../src/server/firestore-repository.js";

export default createAdminListHandler(listAdminLeads, "Bandeja de leads no disponible hasta configurar Firebase Admin.");
