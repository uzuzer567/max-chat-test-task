import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  memo,
} from 'react';
import Message from './components/message';
import Profile from '../../../../components/profile';
import {
  Wrapper,
  EmptyChatPlaceholder,
  Header,
  BackButton,
  HeaderInfo,
  Title,
  Subtitle,
  ErrorBanner,
  Messages,
  MessageInputWrapper,
  MessageInput,
  SendButton,
} from './styles';
import type { Props } from './types';

const Chat = ({
  chat,
  messages,
  error,
  handleSendMessage,
  handleBack,
}: Props) => {
  const [message, setMessage] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = ()=> {
    const preparedMessage = message.trim();

    if (!preparedMessage) {
      return;
    }

    handleSendMessage(preparedMessage);
    setMessage('');
  };

  const sendMessageUsingKeyboard = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      block: 'end',
    });
  }, [messages.length, chat?.chatId]);

  if (!chat) {
    return (
      <Wrapper isEmpty>
        <EmptyChatPlaceholder>
          Выберите чат или создайте новый по номеру телефона
        </EmptyChatPlaceholder>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header>
        <BackButton type="button" onClick={handleBack}>←</BackButton>

        <Profile name={chat.name} size={40} />

        <HeaderInfo>
          <Title>{chat.name}</Title>
          <Subtitle>{chat.phone ? `+${chat.phone}` : `ID ${chat.chatId}`}</Subtitle>
        </HeaderInfo>
      </Header>

      {error && (
        <ErrorBanner>
          Не удалось подключиться к GREEN-API: {error}
        </ErrorBanner>
      )}

      <Messages>
        {messages.length === 0 && (
          <EmptyChatPlaceholder>Сообщений нет</EmptyChatPlaceholder>
        )}

        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}

        <div ref={bottomRef} />
      </Messages>

      <MessageInputWrapper>
        <MessageInput
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyDown={sendMessageUsingKeyboard}
          placeholder="Сообщение"
          rows={1}
          maxLength={4000}
          autoFocus
        />

        <SendButton
          type="button"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          ↑
        </SendButton>
      </MessageInputWrapper>
    </Wrapper>
  )
};

export default memo(Chat);
