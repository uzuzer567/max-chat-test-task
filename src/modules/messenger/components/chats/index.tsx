import { memo, useState } from 'react';
import { CreateChatModal } from '../../../../components/modals/create-chat-modal';
import Profile from '../../../../components/profile';
import {
  Wrapper,
  Header,
  Title,
  CreateButton,
  EmptyChatList,
  EmptyChatListTitle,
  EmptyChatListText,
  ChatList,
  ChatItem,
  ChatBody,
  ChatHeader,
  ChatFooter,
  ChatName,
  ChatTime,
  ChatPreview,
  MessageCount,
} from './styles';
import type { Props } from './types';
import { getTime, getLastMessage } from './utils';

const Chats = ({
  credentials,
  activeChatId,
  handleSelectChat,
  chats,
  setChats,
  messages,
}: Props) => {
  const [isCreateChatModalOpened, setIsCreateChatModalOpened] = useState(false);

  return (
    <Wrapper hasActiveChat={Boolean(activeChatId)}>
      <Header>
        <Title>Чаты</Title>

        <CreateButton onClick={() => setIsCreateChatModalOpened(true)} />
      </Header>

      {chats.length === 0 && (
        <EmptyChatList>
          <EmptyChatListTitle>Чатов нет</EmptyChatListTitle>

          <EmptyChatListText>Создайте чат по номеру телефона собеседника в MAX</EmptyChatListText>
        </EmptyChatList>
      )}

      <ChatList>
        {chats.map(chat => {
          const lastMessage = getLastMessage(chat.chatId, messages);

          return (
            <li key={chat.chatId}>
              <ChatItem
                type="button"
                isActive={chat.chatId === activeChatId}
                onClick={() => handleSelectChat(chat.chatId)}
              >
                <Profile name={chat.name} size={56} />

                <ChatBody>
                  <ChatHeader>
                    <ChatName>{chat.name}</ChatName>

                    {lastMessage && (
                      <ChatTime>
                        {getTime(lastMessage)}
                      </ChatTime>
                    )}
                  </ChatHeader>

                  <ChatFooter>
                    <ChatPreview>
                      {lastMessage ? `${lastMessage.outgoing ? 'Вы: ' : ''}${lastMessage.text}` : 'Нет сообщений'}
                    </ChatPreview>

                    {chat.unread > 0 && (
                      <MessageCount>{chat.unread}</MessageCount>
                    )}
                  </ChatFooter>
                </ChatBody>
              </ChatItem>
            </li>
          )
        })}
      </ChatList>

      <CreateChatModal
        credentials={credentials}
        setChats={setChats}
        isOpened={isCreateChatModalOpened}
        handleSelectChat={handleSelectChat}
        handleClose={() => setIsCreateChatModalOpened(false)}
      />
    </Wrapper>
  )
};

export default memo(Chats);
