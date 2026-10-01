import type { Dispatch, SetStateAction } from 'react';
import type { Chat, Credentials } from '../../../lib/api/types';

export type Props = {
  credentials: Credentials;
  setChats: Dispatch<SetStateAction<Chat[]>>;
  isOpened: boolean;
  handleSelectChat: (chatId: string) => void;
  handleClose: () => void;
};
