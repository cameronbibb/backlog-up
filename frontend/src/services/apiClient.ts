//1. Create an axios instance with your base URL
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

//2. Read the access token from memory (React context) and attach it to outgoing requests

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

//3. When a response comes back as 401, silently call the refresh endpoint, store the new access token, and retry the original request

const refreshAccessToken = async (): Promise<string> => {
  const response = await axios.post(
    "/auth/refresh",
    {},
    {
      baseURL: API_BASE_URL,
      withCredentials: true,
    },
  );
  return response.data.access_token;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.config.url !== "/auth/refresh") {
      const newToken = await refreshAccessToken();
      setAccessToken(newToken);
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(error.config);
    }
  },
);
