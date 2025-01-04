import bcrypt from "bcrypt";

export const hashValue = async (val: string, saltRounds?: number) => {
  return await bcrypt.hash(val, saltRounds || 10);
};

export const compareValue = async (val: string, hashedValue: string) => {
  return await bcrypt.compare(val, hashedValue).catch(() => false);
};
