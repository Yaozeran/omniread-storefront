/* Copyright (c) 2026, Yao Zeran
 * 
 * The authenticated pages' context */


"use client";


import { createContext, useContext, useState, type ReactNode } from "react";

import { Reader, Author, User } from "@/types/user";


export const exampleReader: Reader = {
  id: 'reader-001',
  email: 'reader@example.com',
  name: 'Ari Reader',
  role: 'reader',
  subscribedAuthors: ['author-001'],
};
export const exampleAuthor: Author = {
  id: 'author-001',
  email: 'author@example.com',
  name: 'Mina Author',
  role: 'author',
  authorBio: 'Writes fantasy stories about trade, travel, and folklore.',
  penName: 'M. Aster',
};
const exampleUsers: User[] = [exampleReader, exampleAuthor];


interface AuthContext {
  user: User,
}
const AuthContext = createContext<AuthContext | null>(null);


const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const user = exampleUsers[0];
  return (
    <AuthContext.Provider value={{ user }}>
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
