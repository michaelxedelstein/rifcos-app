import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ maxInstances: 10 });

export { onUserCreated, onUserDeleted } from "./auth.js";
export { generateQuote } from "./pricing.js";
export { cleanupOldLogs } from "./maintenance.js";
