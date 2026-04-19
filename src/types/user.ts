/* Copyright (c) 2026, Yao Zeran
 * 
 * The user related types and interfaces. */


export type UserType = 'reader' | 'author';


export interface UserMetadata {
  id: string;
  email: string;
  name: string;
}


export interface ReaderProfile {
  role: 'reader';
  id: string;

  subscribedUserIds?: string[];
}


export interface AuthorProfile {
  role: 'author';
  id: string;

  penName: string;
  authorBio: string;

  authorIdentity?: AuthorIdentity; 

  subscribedUserIds?: string[];
}


export interface AuthorIdentity {
  name: string;
  country: string; // iso
  id: string;
}


export type UserProfile = ReaderProfile | AuthorProfile;


export interface User {
  metadata: UserMetadata;
  profile?: UserProfile;
}
