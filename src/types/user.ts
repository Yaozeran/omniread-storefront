/* Copyright (c) 2026, Yao Zeran
 * 
 * The user related types and interfaces. */


export type UserType = 'reader' | 'author';


interface UserBase {
  id: string;
  email: string;
  name: string;
}


export interface Reader extends UserBase {
  role: 'reader';
}


export interface Author extends UserBase {
  role: 'author';
  penName: string;
  authorBio: string;

  authorIdentity?: AuthorIdentity; 
}


export interface AuthorIdentity {
  name: string;
  country: string; // iso
  id: string;
}


export type User = Reader | Author;
