// src/services/auth.ts
import api from "../api";

export interface AuthResult {
  success: boolean;
  message?: string | { code: string; description: string }[];
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const response = await api.post<{ token: string }>("/token/login", { email, password });
    localStorage.setItem("authToken", response.data.token);
    return { success: true }; // works now since message is optional
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data || "Login failed"
    };
  }
};

export interface RegisterPayload {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  age?: number;
  gender?: string;
  role?: string;
}

export const register = async (data: RegisterPayload): Promise<AuthResult> => {
  try {
    const response = await api.post("/token/register", data);
    return { success: true, message: response.data as string | { code: string; description: string }[] };
  } catch (error: any) {
    if (error.response?.status === 400 && Array.isArray(error.response.data)) {
      return { success: false, message: error.response.data }; // Identity errors
    }
    return { success: false, message: "Registration failed" };
  }
};




export const logout = (): void => {
  localStorage.removeItem("authToken");
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("authToken");
};
