import express from "express";
import { slotController } from "./slot.module";
import { authMiddleware } from "../../middlewares";

const router = express.Router();

router.get("/", authMiddleware, slotController.getAvailableSlots);

export default router;