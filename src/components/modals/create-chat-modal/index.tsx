import { useEffect, useRef, useState, type FormEvent } from 'react';
import { checkAccount } from '../../../lib/api/green-api';
import {
  Wrapper,
  Modal,
  Title,
  Field,
  Label,
  Input,
  Hint,
  Error,
  Footer,
  Actions,
  CancelButton,
  CreateButton,
} from './styles';
import type { Props } from './types';
import { isValidPhone, normalizePhone } from './utils';

export function CreateChatModal({
  credentials,
  setChats,
  isOpened,
  handleSelectChat,
  handleClose,
}: Props) {
  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const createChat = async (phone: string): Promise<boolean> => {
    const preparedPhone = normalizePhone(phone);

    try {
      const { exist, chatId } = await checkAccount(
        credentials,
        Number(preparedPhone),
      );

      if (!exist || !chatId) {
        setError('Номер не зарегистрирован в MAX');
        return false;
      }

      setChats(chats => {
        const existingChat = chats.find(
          currentChat => currentChat.chatId === chatId,
        );

        const newChat = existingChat
          ? {
            ...existingChat,
            phone: preparedPhone,
          }
          : {
            chatId,
            phone: preparedPhone,
            name: `+${preparedPhone}`,
            unread: 0,
          };

        return [
          newChat,
          ...chats.filter(currentChat => currentChat.chatId !== chatId),
        ];
      });

      handleSelectChat(chatId);

      return true;
    } catch (err) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message
          : 'Не удалось создать чат';

      setError(message);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPhone = async (event: FormEvent) => {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setError('Некорректный номер');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await createChat(phone);

    if (!result) {
      return;
    }

    setPhone('');
    handleClose();
  };

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    return () => clearTimeout(timer);
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <Wrapper onMouseDown={handleClose}>
      <Modal
        onMouseDown={event => event.stopPropagation()}
        onSubmit={sendPhone}
        noValidate
      >
        <Title>Новый чат</Title>

        <Field>
          <Label htmlFor="phone">Номер телефона получателя</Label>
          <Input
            ref={inputRef}
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);

              if (error) {
                setError(null);
              }
            }}
            disabled={isLoading}
          />

          {error ? <Error>{error}</Error> : null}
        </Field>

        <Footer>
          <Hint>
            <span>РБ: +375 00 123-45-67</span>
            <span>РФ: +7 000 123-45-67</span>
          </Hint>

          <Actions>
            <CancelButton type="button" onClick={handleClose} disabled={isLoading}>
              Отмена
            </CancelButton>

            <CreateButton type="submit" disabled={!phone.trim() || isLoading}>
              {isLoading ? 'Проверка…' : 'Создать'}
            </CreateButton>
          </Actions>
        </Footer>
      </Modal>
    </Wrapper>
  );
}
