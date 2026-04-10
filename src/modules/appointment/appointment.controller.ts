import { NextFunction, Response } from "express";
import { ApiError, ApiResponse } from "../../utils";
import { StatusCodes } from "http-status-codes";
import AppointmentService from "./appointment.service";
import { AuthRequest } from "../auth/auth.types";

class AppointmentController {
  appointmentService: AppointmentService;
  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  bookAppointment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { slotId } = req.body as { slotId: string };
      const user = req.user;
      if (!user || !user.userId) return next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
      const userId = user.userId;
      const booked = await this.appointmentService.bookSlot(slotId, userId);
      return ApiResponse.success(res, StatusCodes.CREATED, "Slot booked successfully", booked);
    } catch (error) {
      return next(error);
    }
  };

  getMyAppointments = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user || !user.userId) return next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
      const userId = user.userId;
      const list = await this.appointmentService.getMyAppointments(userId);
      return ApiResponse.success(res, StatusCodes.OK, "Appointments fetched", list);
    } catch (error) {
      return next(error);
    }
  };

  cancelAppointment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const slotId = req.params.id as string;
      const user = req.user;
      if (!user || !user.userId) return next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
      const userId = user.userId;
      await this.appointmentService.cancelAppointment(slotId, userId);
      return ApiResponse.success(res, StatusCodes.OK, "Appointment cancelled");
    } catch (error) {
      return next(error);
    }
  };
}

export default AppointmentController;
