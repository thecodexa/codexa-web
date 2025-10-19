import React, { createContext,useContext, useState } from "react";

// Create the context
const AuthContext = createContext(null);

// AuthProvider wraps your app
export const AuthProvider = ({ children }) => {
  const [authType, setAuthType] = useState("none"); // "none" | "login" | "signup"
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ authType, setAuthType,user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};