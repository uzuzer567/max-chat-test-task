import { useCallback, useEffect, useRef, useState } from 'react';
import ActiveChat from './components/chat';
import Chats from './components/chats';
import Sidebar from '../../components/sidebar';
import type { Chat, Message } from '../../lib/api/types';
import { sendMessage } from '../../lib/api/green-api';
import { type IncomingEvent, useNotifications } from '../../lib/hooks/use-notifications';
import { loadChats, loadMessages, saveChats, saveMessages } from '../../utils';
import { Wrapper } from './styles';
import type { Props } from './types';

let localMessageCount = 0;

export default function Messenger({ credentials, handleLogout }: Props) {
  const { idInstance } = credentials;

  const [chats, setChats] = useState<Chat[]>(() => loadChats(idInstance));
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const activeChat = chats.find(currentChat => currentChat.chatId === activeChatId) ?? null;

  const [messages, setMessages] = useState<Message[]>(() => loadMessages(idInstance));
  const messagesRef = useRef(messages);

  const [error, setError] = useState<string | null>(null);

  const handleSelectChat = (chatId: string)=> {
    setActiveChatId(chatId);
    setChats(prev =>
      prev.map(currentChat => (currentChat.chatId === chatId && currentChat.unread ? { ...currentChat, unread: 0 } : currentChat)),
    );
  };

  const handleSendMessage = async (text: string) => {
    if (!activeChatId) {
      return;
    }

    const messageId = `${Date.now()}-${++localMessageCount}`;
    setMessages(prev => [
      ...prev,
      {
        id: messageId,
        chatId: activeChatId,
        text,
        outgoing: true,
        timestamp: Date.now(),
        status: 'sending',
      },
    ]);

    setChats(prev => {
      const chat = prev.find(currentChat => currentChat.chatId === activeChatId);
      return chat && prev[0] !== chat ? [chat, ...prev.filter(currentChat => currentChat !== chat)] : prev;
    });

    try {
      const { idMessage } = await sendMessage(credentials, activeChatId, text);
      setMessages(prev => {
        const uniqueMessages =
          prev.filter(currentMessage => currentMessage.id !== idMessage);
        return uniqueMessages.map(currentMessage => (currentMessage.id === messageId ? { ...currentMessage, id: idMessage, status: 'sent' } : currentMessage));
      });
    } catch {
      setMessages(prev =>
        prev.map(currentMessage => (currentMessage.id === messageId ? { ...currentMessage, status: 'failed' } : currentMessage))
      );
    }
  };

  const handleIncomingEvent = useCallback(({ message, senderName }: IncomingEvent) => {
    if (messagesRef.current.some(currentMessage => currentMessage.id === message.id)) {
      return;
    }

    setMessages(prev => (
      prev.some(currentMessage => currentMessage.id === message.id) ? prev : [...prev, message]
    ));

    setChats(prev => {
      const existingChat = prev.find(currentChat => currentChat.chatId === message.chatId);
      const isActiveChat = message.chatId === activeChatId;

      if (!existingChat) {
        const chat = {
          chatId: message.chatId,
          name: senderName || message.chatId,
          unread: message.outgoing || isActiveChat ? 0 : 1,
        };
        return [chat, ...prev];
      }

      const updatedChat = {
        ...existingChat,
        name: senderName || existingChat.name,
        unread: message.outgoing || isActiveChat ? existingChat.unread : existingChat.unread + 1,
      };
      return [updatedChat, ...prev.filter(currentChat => currentChat !== existingChat)];
    });
  }, [activeChatId]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    saveChats(idInstance, chats);
  }, [idInstance, chats]);

  useEffect(() => {
    saveMessages(idInstance, messages);
  }, [idInstance, messages]);

  useNotifications(credentials, handleIncomingEvent, setError);

  return (
    <Wrapper>
      <Sidebar handleLogout={handleLogout} />
      <Chats
        credentials={credentials}
        activeChatId={activeChatId}
        handleSelectChat={handleSelectChat}
        chats={chats}
        setChats={setChats}
        messages={messages}
      />
      <ActiveChat
        chat={activeChat}
        messages={messages.filter(currentMessage => currentMessage.chatId === activeChatId)}
        error={error}
        handleSendMessage={handleSendMessage}
        handleBack={() => setActiveChatId(null)}
      />
    </Wrapper>
  );
}
