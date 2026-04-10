import { AppointmentSlotModel } from "../appointment";

class SlotService {
    getAvailableSlots = async (date: string) => {
        try {
            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0);

            const slots = await AppointmentSlotModel.find({
                date: selectedDate,
                isBooked: false,
            }, { __v: 0 }).sort({ startTime: 1 }).lean();

            const formattedSlots = slots.map(({ _id, ...rest }) => ({
                ...rest,
                id: _id,
            }));

            return formattedSlots;
        } catch (error) {
            throw error;
        }
    }
}

export default SlotService;