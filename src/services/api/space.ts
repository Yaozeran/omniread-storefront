/* Copyright (c) 2026, Yao Zeran 
 * 
 * The api services that fetch user space data from the backend server. */


import { api, fetchJson } from "@/services/http";

import { BookReview, MailMessage } from "@/types/space";
import { Book, BookMetadata } from "@/types/book";


const sampleMails: MailMessage[] = [
	{
		id: 1,
		sender: "Mina Author",
		subject: "New chapter announcement",
		content:
			"The next chapter is live. I also added a short note about the inspiration behind the desert city scenes.",
		time: "10m",
		unread: true,
	},
	{
		id: 2,
		sender: "Storefront Support",
		subject: "Your order is on the way",
		content:
			"Your latest book shipment has been packed and handed off to the courier. Tracking details are ready.",
		time: "1h",
	},
	{
		id: 3,
		sender: "Weekly Digest",
		subject: "Books you might like this week",
		content:
			"A new shortlist is ready based on your reading history, with more fantasy and strategy-heavy picks.",
		time: "Yesterday",
	},
];

import { sampleBooks } from "./book";

const sampleRecentReadsIds: string[] = [
	"1", "2"
]

const samplePosts: BookReview[] = [
		{
			id: "1",
			writerId: "reader-001",
			bookId: "1",
			rating: 5,
			content:
				"Worldbuilding stays sharp the entire way through. The political tension feels deliberate and the pacing lands well once the plot starts moving.",
			views: 124,
			likes: 38,
			dislikes: 2,
			date: "2 hours ago",
		},
		{
			id: "2",
			writerId: "reader-001",
			bookId: "2",
			rating: 4,
			content:
				"A quieter read with a strong conversational rhythm. The trade-focused setup makes the relationship scenes feel even more grounded.",
			views: 91,
			likes: 27,
			dislikes: 1,
			date: "Yesterday",
		},
		{
			id: "3",
			writerId: "reader-001",
			bookId: "3",
			rating: 5,
			content:
				"Big momentum, clean escalation, and a satisfying power fantasy structure. It is easy to keep turning pages once it gets going.",
			views: 203,
			likes: 62,
			dislikes: 4,
			date: "3 days ago",
		},
];


export async function fetchUserMails(userId: string) {
  try {
    return await fetchJson<MailMessage[]>(`/space/${userId}/mails`);
  } catch (e) {
    return sampleMails;
  }
}


export async function fetchUserBooks(userId: string): Promise<Record<string, Book>> {
	try {
    const books = await fetchJson<Record<string, Book>>("/books", {
      query: { userId: userId, },
    });
    return books;
  } catch (e) {
    return sampleBooks;
  }
}


export async function fetchUserRecentReadsIds(userId: string): Promise<string[]> {
	try {
    return await fetchJson<string[]>(`/space/${userId}/recent-reads`);
  } catch (e) {
    return sampleRecentReadsIds;
  }
}
