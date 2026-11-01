
import { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("appointEaseUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // Login user
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("appointEaseToken", response.data.token);
      localStorage.setItem(
        "appointEaseUser",
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (name, email, password) => {
    setLoading(true);

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("appointEaseToken", response.data.token);
      localStorage.setItem(
        "appointEaseUser",
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("appointEaseToken");
    localStorage.removeItem("appointEaseUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
