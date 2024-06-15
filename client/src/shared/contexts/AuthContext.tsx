"use client";
import { getUser } from "@/lib/actions";
import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
  plushies: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    const userFromBackend = await getUser();
    setUser(userFromBackend);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
