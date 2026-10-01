import type { Credentials, Chat, Message } from './lib/api/types';
import {
  CREDENTIALS_QUERY_KEY,
  CHATS_QUERY_KEY,
  MESSAGES_QUERY_KEY,
} from './lib/constants/query-keys';

const getIdInstanceChatsKey = (id: string) => `${CHATS_QUERY_KEY}-${id}`;
const getIdInstanceMessagesKey = (id: string) => `${MESSAGES_QUERY_KEY}-${id}`;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const loadCredentials = () =>
  read<Credentials | null>(CREDENTIALS_QUERY_KEY, null);
export const saveCredentials = (credentials: Credentials) =>
  write(CREDENTIALS_QUERY_KEY, credentials);
export function clearCredentials() {
  try {
    localStorage.removeItem(CREDENTIALS_QUERY_KEY);
  } catch {}
}

export const loadChats = (idInstance: string) =>
  read<Chat[]>(getIdInstanceChatsKey(idInstance), []);
export const saveChats = (idInstance: string, chats: Chat[]) =>
  write(getIdInstanceChatsKey(idInstance), chats);

export const loadMessages = (idInstance: string) =>
  read<Message[]>(getIdInstanceMessagesKey(idInstance), []);
export const saveMessages = (idInstance: string, messages: Message[]) =>
  write(getIdInstanceMessagesKey(idInstance), messages);
