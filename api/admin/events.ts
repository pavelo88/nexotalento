import { listAdminTrackingEvents } from "../../src/server/firestore-repository";
import { createAdminListHandler } from "../../src/server/serverless-admin";

export default createAdminListHandler(listAdminTrackingEvents, "Eventos no disponibles hasta configurar Firebase Admin.");
