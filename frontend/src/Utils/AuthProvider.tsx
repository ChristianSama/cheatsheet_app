import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { Token } from "../types";

interface AuthContextType {
  user: any;
  login: (user: any, callback: VoidFunction) => Promise<void>;
  logout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const stored = localStorage.getItem("authTokens");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("authTokens");
    return stored ? jwtDecode(JSON.parse(stored).access) : null;
  });

  const login = async (newUser: any, callback: VoidFunction) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}token/`,
      options
    );
    const tokens = await response.json();

    if (response.status === 200) {
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      callback();
    } else {
      console.log("algo salio mal al hacer login");
    }
  };

  const logout = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
