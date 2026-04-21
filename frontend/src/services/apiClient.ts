//1. Create an axios instance with your base URL
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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

//**When a response comes back as 401, silently call the refresh endpoint, store the new access token, and retry the original request, if the request fails again log the user out and communicate session ended.**

interface RefreshResponse {
  access_token: string;
  user: { id: number; email: string };
}

export const refreshAccessToken = async (): Promise<RefreshResponse> => {
  const response = await axios.post<RefreshResponse>(
    "/refresh",
    {},
    {
      baseURL: API_BASE_URL,
      withCredentials: true,
    },
  );
  return response.data;
};

let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config.url !== "/refresh") {
      try {
        const data = await refreshAccessToken();
        const newToken = data.access_token;
        setAccessToken(newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(error.config);
      } catch {
        setAccessToken(null);
        if (logoutCallback) logoutCallback();
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
