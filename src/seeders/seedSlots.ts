import mongoose from "mongoose";
import dotenv from "dotenv";
import { AppointmentSlotModel } from "../modules/appointment";
import { envConfig } from "../config";

dotenv.config();

const { mongodbUsername, mongodbPassword, mongodbCluster, mongodbDbName } = envConfig;
const MONGO_URI = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbCluster}/${mongodbDbName}`;
const DAYS = 7;
const SLOT_DURATION_MINUTES = 30;

const START_HOUR = 10; // 10 AM
const END_HOUR = 17;

const generateSlots = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to DB: ${mongoose.connection.name}`);

    const slots = [];
    const now = new Date();

    for (let day = 0; day < DAYS; day++) {
      const baseDate = new Date(now);
      baseDate.setDate(now.getDate() + day);

      //starting of day
      baseDate.setHours(0, 0, 0, 0);

      let currentTime = new Date(baseDate);
      currentTime.setHours(START_HOUR, 0, 0, 0);

      const endBoundary = new Date(baseDate);
      endBoundary.setHours(END_HOUR, 0, 0, 0);

      while (currentTime < endBoundary) {
        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime);
        endTime.setMinutes(endTime.getMinutes() + SLOT_DURATION_MINUTES);

        slots.push({
          date: baseDate,
          startTime,
          endTime,
          isBooked: false,
          bookedBy: null,
        });

        // move to next slot
        currentTime.setMinutes(
          currentTime.getMinutes() + SLOT_DURATION_MINUTES
        );
      }
    }

    if (slots.length === 0) {
      console.log("No slots generated");
      process.exit(0);
    }

    // 🔥 insert with duplicate protection
    await AppointmentSlotModel.insertMany(slots, {
      ordered: false,
    });

    console.log(`Inserted ${slots.length} slots successfully`);
  } catch (error: any) {
    if (error.code === 11000) {
      console.log("Duplicate slots detected (ignored due to index)");
    } else {
      console.error("Error seeding slots:", error);
    }
  } finally {
    await mongoose.disconnect();
    console.log(`Closed DB  connection successfully`);
    process.exit(0);
  }
};

generateSlots();