import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  user: any;
  login: (user: any) => void;
  logout: () => void;
  isAuthenticated: boolean; // ✅ Add this line
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = (userData: any) => setUser(userData);
  const logout = () => setUser(null);
  const isAuthenticated = !!user; // ✅ Compute auth status

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
