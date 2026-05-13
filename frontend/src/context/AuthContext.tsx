import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  setLogoutCallback,
  setAccessToken as setAPIAccessToken,
  refreshAccessToken,
} from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";

interface AuthContextType {
  accessToken: string | null;
  user: { id: number; email: string } | null;
  login: (token: string, user: { id: number; email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  const login = (token: string, user: { id: number; email: string }) => {
    setAccessToken(token);
    setUser(user);
    setAPIAccessToken(token);
  };

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setAPIAccessToken(null);
    logoutUser();
    navigate("/login");
  }, [navigate]);

  useEffect(() => setLogoutCallback(logout), [logout]);

  useEffect(() => {
    async function silentRefresh() {
      try {
        const data = await refreshAccessToken();
        login(data.access_token, data.user);
      } catch {
        //no valid session
      }
    }
    silentRefresh();
  }, []);

  return (
    <AuthContext value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
