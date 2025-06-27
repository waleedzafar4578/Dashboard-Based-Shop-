import { createContext, useContext, useState, useEffect } from "react";
import { LoginPayload, UserAuth } from "../commonTypes/user";
import { loginUser } from "../services/login";

type AuthContextType = {
  auth: UserAuth | null;
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<UserAuth | null>(null);

  useEffect(() => {
    const authString = localStorage.getItem("auth");
    if (authString) {
      try {
        const parsed = JSON.parse(authString);
        if (parsed.token) {
          setAuth(parsed);
        }
      } catch (e) {
        console.error("Invalid auth data", e);
      }
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    const authData=await loginUser(payload)
    localStorage.setItem("auth", JSON.stringify(authData));
    setAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
