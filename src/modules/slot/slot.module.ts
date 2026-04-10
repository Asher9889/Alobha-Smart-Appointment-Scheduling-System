import SlotController from "./slot.controller";
import SlotService from "./slot.service";

const slotService = new SlotService();
const slotController = new SlotController(slotService);

export { slotController, slotService };
