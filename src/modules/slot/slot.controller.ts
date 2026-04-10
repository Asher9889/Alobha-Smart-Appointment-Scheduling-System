import { NextFunction, Request, Response } from "express";
import SlotService from "./slot.service";
import { ApiResponse } from "../../utils";
import { StatusCodes } from "http-status-codes";

class SlotController {
    slotService: SlotService;
    constructor(slotService: SlotService) {
        this.slotService = slotService;
    }

    getAvailableSlots = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { date } = req.query as { date: string };
            const slots = await this.slotService.getAvailableSlots(date);
            return ApiResponse.success(res, StatusCodes.OK, "Available slots fetched successfully", slots);
        } catch (error) {
            next(error);
        }
    }
}

export default SlotController;