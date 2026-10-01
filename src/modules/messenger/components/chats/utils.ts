import type { Message } from '../../../../lib/api/types';

export const getTime = (message: Message) => {
  return new Date(message.timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getLastMessage = (chatId: string, messages: Message[]) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].chatId === chatId) {
      return messages[index];
    }
  }
};
