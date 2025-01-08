import API from "../config/apiClient";

export const login = async (data) => {
  return API.post("/auth/login", data);
};
export const register = async (data) => {
  return API.post("/auth/register", data);
};

export const verifyEmail = async (verificationCode) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (email) =>
  API.post("/auth/password/forgot", { email });
