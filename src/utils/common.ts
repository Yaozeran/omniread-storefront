

import type { MailMessage } from "@/types/user";


export function countUnreadMessages(messages: MailMessage[]) {
	return messages.reduce((count, message) => {
		return count + (message.unread ? 1 : 0);
	}, 0);
};

