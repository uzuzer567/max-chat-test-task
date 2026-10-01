import type { Chat, Message } from '../../../../lib/api/types';

export type Props = {
  chat: Chat | null;
  messages: Message[];
  error: string | null;
  handleSendMessage: (message: string) => void;
  handleBack: () => void;
};
