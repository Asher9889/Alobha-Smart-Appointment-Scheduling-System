import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import AppointmentSlotModel from "./appointmentSlot.model";
import mongoose from "mongoose";

class AppointmentService {
    
    // Book a slot for a user
    bookSlot = async (slotId: string, userId: string) => {
        const slot = await AppointmentSlotModel.findById(slotId);

        if (!slot) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Slot not found");
        }

        if (slot.startTime < new Date()) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Cannot book past slot");
        }

        const existingBooking = await AppointmentSlotModel.findOne({
            bookedBy: new mongoose.Types.ObjectId(userId),
            date: slot.date,
        }).lean();

        if (existingBooking) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Already booked a slot for this day");
        }

        const updatedSlot = await AppointmentSlotModel.findOneAndUpdate(
            {
                _id: slotId,
                isBooked: false,
            },
            {
                isBooked: true,
                bookedBy: new mongoose.Types.ObjectId(userId),
            },
            { new: true }
        );

        if (!updatedSlot) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Slot already booked");
        }

        // convert mongoose document to plain object and expose `id` instead of `_id`
        const obj = updatedSlot.toObject ? updatedSlot.toObject() : updatedSlot;
        const { _id, __v, ...rest } = obj as any;
        return { id: _id, ...rest };
    };

    // get all appointments
    getMyAppointments = async (userId: string) => {
        const slots = await AppointmentSlotModel.find({
            bookedBy: new mongoose.Types.ObjectId(userId),
        }).sort({ startTime: 1 }).lean();

        return slots.map(({ _id, __v, ...rest }) => ({ id: _id, ...rest }));
    };

    // cancel appointment
    cancelAppointment = async (slotId: string, userId: string) => {
        const slot = await AppointmentSlotModel.findById(slotId);

        if (!slot || slot.bookedBy?.toString() !== userId) {
            throw new ApiError(403, "Not allowed");
        }

        const cutoff = new Date(slot.startTime);
        cutoff.setHours(cutoff.getHours() - 1);

        if (new Date() > cutoff) {
            throw new ApiError(400, "Too late to cancel");
        }

        await AppointmentSlotModel.findByIdAndUpdate(slotId, {
            isBooked: false,
            bookedBy: null,
        });
    };
}

export default AppointmentService;