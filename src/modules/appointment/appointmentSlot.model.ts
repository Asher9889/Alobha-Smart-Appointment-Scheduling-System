
import mongoose, { Document } from "mongoose";

export interface IAppointmentSlot extends Document {
    date: Date;
    startTime: Date;
    endTime: Date;

    isBooked: boolean;
    bookedBy: mongoose.Schema.Types.ObjectId | null;

    createdAt: Date;
    updatedAt: Date;
}

const appointmentSlotSchema = new mongoose.Schema<IAppointmentSlot>(
    {
        date: {
            type: Date,
            required: true,
            index: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },

        isBooked: {
            type: Boolean,
            default: false,
            index: true,
        },

        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true,
        },
    }, { timestamps: true }
);

appointmentSlotSchema.index( { date: 1, startTime: 1, endTime: 1 }, { unique: true }); // to check no duplicate slot for same date and time
appointmentSlotSchema.index({ bookedBy: 1, date: 1 }); // for faster fetching user appointments(one appointment per day)
appointmentSlotSchema.index({ isBooked: 1, date: 1 }); // for faster checking slot is available or not

const AppointmentSlotModel = mongoose.model<IAppointmentSlot>("AppointmentSlot", appointmentSlotSchema);

export default AppointmentSlotModel;

