import { createContext, useContext, useState, useEffect } from "react";
import { setAccessToken as setApiToken } from "../services/apiClient";

interface AuthContextType {
  accessToken: string | null;
  user: {id: number, email: string} | null;
  login: (token: string, user: {id: number, email: string}) => void;
  logout: () => void;
}

//Where do these login and logout methods come from?
//When and where do the accessToken and user get set?

//AuthContext is initially null before login.
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; email: string } | null >(null);
  

  const login = (token: string, user: { id: number; email: string }) => {
    setAccessToken(token);
    setUser(user);
    setApiToken(token);
  }

  const logout = () => {

  }

  return (
    <AuthContext.Provider value={{accessToken, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}