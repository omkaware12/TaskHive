import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


