import { registerSchema } from "./auth.schema";
import z from "zod";


type TRegister = z.infer<typeof registerSchema>;

import { Request } from "express";

// make `user` optional so handlers remain compatible with Express Request type
type AuthRequest = Request & { user?: { userId: string } };

export { TRegister, AuthRequest };  