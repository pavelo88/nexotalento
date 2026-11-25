import { listAdminTrackingEvents } from "../../src/server/firestore-repository.js";
import { createAdminListHandler } from "../../src/server/serverless-admin.js";

export default createAdminListHandler(listAdminTrackingEvents, "Eventos no disponibles hasta configurar Firebase Admin.");
