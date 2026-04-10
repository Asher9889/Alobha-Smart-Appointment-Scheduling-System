import express from "express";
import { validate } from "../../middlewares";
import { loginSchema, registerSchema } from "./auth.schema";
import { authController } from "./auth.module";
    
const router = express.Router();

router.post("/register", validate(registerSchema),  authController.registerUser);

router.post("/login", validate(loginSchema), authController.loginUser);

export default router;