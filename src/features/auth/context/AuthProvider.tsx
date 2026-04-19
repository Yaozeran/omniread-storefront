/* Copyright (c) 2026, Yao Zeran
 * 
 * The authenticated pages' context, contains the current user info. */


"use client";


import { createContext, useContext, useState, type ReactNode } from "react";

import { ReaderProfile, User, UserMetadata } from "@/types/user";
import { getToken, clearToken } from "@/utils/jwt";


export const exampleReader: User = {
  metadata : {
    id: 'reader-001',
    email: 'reader@example.com',
    name: 'Ari Reader',
  },
  profile : {
    role: 'reader',
    id: 'reader-001',
  }
};
export const exampleAuthor: User = {
  metadata : {
    id: 'author-001',
    email: 'author@example.com',
    name: 'Mina Author',
  },
  profile : {
    role: 'author',
    id: 'reader-001',
    authorBio: 'Writes fantasy stories about trade, travel, and folklore.',
    penName: 'M. Aster',
  }
};
const exampleUsers: User[] = [exampleReader, exampleAuthor];


interface AuthContext {
  user: User;
  setUser: (user: User) => void,
  logout: () => void,
  isAuthenticated: boolean,
}
const AuthContext = createContext<AuthContext | null>(null);


function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  
  const [user, setUser] = useState<User>(exampleUsers[0]);
  
  const logout = () => {
    clearToken();
    setUser(exampleUsers[0]); // Reset to example user
  };
  
  const isAuthenticated = !!getToken();
  
  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};


export { useAuthContext };
export default AuthProvider;
