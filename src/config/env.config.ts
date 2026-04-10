import dotenv from "dotenv";
import IEnvConfig from "./env.interface";

dotenv.config();

const envConfig:IEnvConfig = {
    PORT: process.env.PORT || 3000,
}

export default envConfig;