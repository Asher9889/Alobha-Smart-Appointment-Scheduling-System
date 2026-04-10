import { registerSchema } from "./auth.schema";
import z from "zod";


type TRegister = z.infer<typeof registerSchema>;

export { TRegister };