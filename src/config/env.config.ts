import dotenv from "dotenv";
import IEnvConfig from "./env.interface";

dotenv.config();

const envConfig:IEnvConfig = {
    port: Number(process.env.PORT || 3000),
    mongodbUsername: process.env.MONGODB_USERNAME!,
    mongodbPassword: encodeURIComponent(process.env.MONGODB_PASSWORD!),
    mongodbCluster: process.env.MONGODB_CLUSTER!,
    mongodbDbName: process.env.MONGODB_DB_NAME!
}

export default envConfig;