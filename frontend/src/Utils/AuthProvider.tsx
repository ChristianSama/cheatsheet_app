import { createContext, useState } from "react";

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const signin = (newUser: string, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}