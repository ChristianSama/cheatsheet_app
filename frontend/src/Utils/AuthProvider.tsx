import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

interface AuthContextType {
  authTokens: any;
  setAuthTokens: React.Dispatch<any>;
  user: any;
  setUser: React.Dispatch<any>;
  login: (user: any, callback: VoidFunction) => Promise<void>;
  logout: (callback: VoidFunction) => void;
  register: (
    username: string,
    password: string,
    password2: string,
    callback: VoidFunction
  ) => void;
  errorMessage: string | null;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

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
      const msj = "Algo salio mal al hacer login";
      setErrorMessage(msj);
    }
  };

  const logout = (callback: VoidFunction) => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    callback();
  };

  const register = async (
    username: string,
    password: string,
    password2: string,
    callback: VoidFunction
  ) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password2,
      }),
    });
    if (response.status === 201) {
      callback();
    } else {
      const data = await response.json();
      if (data.username) {
        alert(data.username[0]);
      } else if (data.password) {
        alert(data.password[0]);
      } else if (data.password2) {
        alert(data.password2[0]);
      }
    }
  };

  const value = {
    authTokens,
    setAuthTokens,
    user,
    setUser,
    login,
    logout,
    register,
    errorMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
