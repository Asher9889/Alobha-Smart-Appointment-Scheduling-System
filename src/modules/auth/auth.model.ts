import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true }
);


userSchema.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model<IUser>("User", userSchema);
