import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("chatstans:user", null);

  // Simulated async login
  function login(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: 1,
          name: email.split("@")[0] || "You",
          email,
          avatar: "https://i.pravatar.cc/150?img=1",
        };
        setUser(newUser);
        resolve(newUser);
      }, 700);
    });
  }

  // Simulated async register
  function register(name, email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: 1,
          name,
          email,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
        };
        setUser(newUser);
        resolve(newUser);
      }, 900);
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}