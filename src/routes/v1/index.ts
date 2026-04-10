import express from "express";
import { authRoutes } from "../../modules/auth";
import { appointmentRoutes } from "../../modules/appointment";
import { slotRoutes } from "../../modules/slot";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/slots", slotRoutes);

export default router;