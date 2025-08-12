import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authType, setAuthType] = useState(null); // null = closed, "login" or "signup" = open

  return (
    <AuthContext.Provider value={{ authType, setAuthType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
