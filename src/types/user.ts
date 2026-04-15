/* Copyright (c) 2026, Yao Zeran
 * 
 * The user related types and interfaces. */


export type Role = 'reader' | 'author';


interface UserBase {
  id: string;
  email: string;
  name: string;
}


export interface Reader extends UserBase {
  role: 'reader';
  subscribedAuthors: string[];
}


export interface Author extends UserBase {
  role: 'author';
  authorBio: string;
  penName: string;
}


export type User = Reader | Author;


export interface BookReview {
  id: string,

  writer: string,
  book: string,

  rating: number,
  content: string,
  
  views: number,
  likes: number,
  dislikes: number,

  date: string,
}


export interface Comment {
  id: string,

  writer: string,
  
  content: string,

  views: number,
  likes:number,
  dislikes: number,
}


export interface MailMessage  {
	id: number;

	sender: string;
	subject: string;
	preview: string;
	time: string;

	unread?: boolean;
};

