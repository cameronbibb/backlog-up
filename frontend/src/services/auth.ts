import apiClient from "./apiClient";

interface AuthResponse {
  token: string;
  user: { id: number; email: string };
}

export async function registerUser(
  email: string,
  password: string,
  password_confirmation: string,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(`/signup`, {
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  });

  return response.data;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(`/login`, {
    email: email,
    password: password,
  });

  return response.data;
}

export async function logoutUser() {
  await apiClient.post("/logout");
}
