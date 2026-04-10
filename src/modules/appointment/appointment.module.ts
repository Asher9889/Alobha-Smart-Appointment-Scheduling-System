import AppointmentController from "./appointment.controller";
import AppointmentService from "./appointment.service";

const appointmentService = new AppointmentService();
const appointmentController = new AppointmentController(appointmentService);

export { appointmentController, appointmentService };
