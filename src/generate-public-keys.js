import { getCertificates, putDatabaseSettings } from "./helpers/helpers.js";

const url =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

const result = await getCertificates(url);
await putDatabaseSettings(result);
