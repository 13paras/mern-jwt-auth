import API from "../config/apiClient";

export const login = async (data) => {
  return API.post("/auth/login", data);
};
export const register = async (data) => {
  return API.post("/auth/register", data);
};
export const logout = async () => {
  return API.get("/auth/logout");
};

export const verifyEmail = async (verificationCode) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (email) =>
  API.post("/auth/password/forgot", { email });

export const resetPassword = async ({ verificationCode, password }) =>
  API.post("/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get("/user");

export const getSessions = async () => API.get("/sessions");

export const deleteSession = async (id) => API.delete(`/sessions/${id}`);
