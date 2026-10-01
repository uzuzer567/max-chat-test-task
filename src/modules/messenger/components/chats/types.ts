import type { Dispatch, SetStateAction } from 'react';
import type { Chat, Credentials, Message } from '../../../../lib/api/types';

export type Props = {
  credentials: Credentials;
  activeChatId: string | null;
  handleSelectChat: (chatId: string) => void;
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
  messages: Message[];
};
