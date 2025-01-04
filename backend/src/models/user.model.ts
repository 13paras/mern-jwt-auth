import { model, Schema, type Document } from "mongoose";
import { string } from "zod";
import bcrypt from "bcrypt";
import { compareValue, hashValue } from "@/utils/bcrypt.js";
export interface UserDocument extends Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await hashValue(this.password);
  if (typeof hashedPassword === "string") {
    this.password = hashedPassword;
  }
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
