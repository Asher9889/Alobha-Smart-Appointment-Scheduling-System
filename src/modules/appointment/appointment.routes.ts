import express from "express";
import { appointmentController } from "./appointment.module";
import { authMiddleware } from "../../middlewares";

const router = express.Router();

// router.post("/", authMiddleware, appointmentController.bookAppointment);
// router.get("/", authMiddleware, appointmentController.getMyAppointments);
// router.delete("/:id", authMiddleware, appointmentController.cancelAppointment);
router.post("/", authMiddleware, appointmentController.bookAppointment);
router.get("/", authMiddleware, appointmentController.getMyAppointments);
router.delete("/:id", authMiddleware, appointmentController.cancelAppointment);

export default router;
