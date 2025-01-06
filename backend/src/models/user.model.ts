import { compareValue, hashValue } from "@/utils/bcrypt.js";
import { model, Schema, type Document } from "mongoose";
export interface UserDocument extends Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
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

userSchema.methods.comparePassword = async function (password: string) {
  return compareValue(password, this.password);
};

userSchema.methods.omitPassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
