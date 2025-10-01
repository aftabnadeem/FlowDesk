import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/user";

export const login = async (formData) => {
  const res = await axios.post(`${BASE_URL}/login/`, formData);
  if (res.data.access && res.data.refresh) {
    localStorage.setItem("token", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
  }
  return res.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) return null;

  try {
    const res = await axios.post(`${BASE_URL}/token-refresh/`, { refresh });
    localStorage.setItem("token", res.data.access);
    return res.data.access;
  } catch (err) {
    logout();
    return null;
  }
};

export const signup = async (formData) => {
  const res = await axios.post(`${BASE_URL}/register/`, formData);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
