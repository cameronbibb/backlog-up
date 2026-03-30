import { createContext, useContext, useState, useEffect } from "react";
import { setLogoutCallback, setAccessToken as setApiToken, refreshAccessToken } from "../services/apiClient";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  accessToken: string | null;
  user: {id: number, email: string} | null;
  login: (token: string, user: {id: number, email: string}) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; email: string } | null >(null);
  

  const login = (token: string, user: { id: number; email: string }) => {
    setAccessToken(token);
    setUser(user);
    setApiToken(token);
  }

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    setApiToken(null);
    navigate('/login');
  }

  useEffect(() => setLogoutCallback(logout), []);

  useEffect(() => {
    async function silentRefresh () {
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
    <AuthContext.Provider value={{accessToken, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}