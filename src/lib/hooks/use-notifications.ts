import { useEffect, useRef } from 'react';
import type { Credentials, Message, Notification } from '../api/types';
import { deleteNotification, receiveNotification } from '../api/green-api';

const RECEIVE_TIMEOUT = 20;
const RETRY_DELAY = 5000;

export interface IncomingEvent {
  message: Message;
  senderName?: string;
}

const getPreparedNotification = (notification: Notification): IncomingEvent | null => {
  const { body } = notification;
  const isOutgoing =
    body.typeWebhook === 'outgoingMessageReceived' || body.typeWebhook === 'outgoingAPIMessageReceived';

  if (body.typeWebhook !== 'incomingMessageReceived' && !isOutgoing) {
    return null;
  }

  const messageData = body.messageData;
  const text =
    messageData?.typeMessage === 'textMessage'
      ? messageData.textMessageData?.textMessage
      : messageData?.typeMessage === 'extendedTextMessage'
        ? messageData.extendedTextMessageData?.text
        : undefined;

  if (!text || !body.senderData || !body.idMessage) {
    return null;
  }

  return {
    message: {
      id: body.idMessage,
      chatId: body.senderData.chatId,
      text,
      outgoing: isOutgoing,
      timestamp: (body.timestamp ?? Date.now() / 1000) * 1000,
      status: isOutgoing ? 'sent' : undefined,
    },
    senderName:
      isOutgoing
        ? body.senderData.chatName
        : body.senderData.senderName || body.senderData.chatName,
  };
};

const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    const timeoutId = setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
        resolve();
      },
      { once: true },
    );
  });

export const useNotifications = (
  credentials: Credentials,
  onEvent: (e: IncomingEvent) => void,
  onError: (message: string | null) => void,
) => {
  const onEventRef = useRef(onEvent);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onEventRef.current = onEvent;
    onErrorRef.current = onError;
  }, [onEvent, onError]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      while (!signal.aborted) {
        try {
          const notification = await receiveNotification(credentials, RECEIVE_TIMEOUT, signal);
          onErrorRef.current(null);

          if (!notification) {
            continue;
          }

          const preparedNotification = getPreparedNotification(notification);

          if (preparedNotification) {
            onEventRef.current(preparedNotification);
          }

          await deleteNotification(credentials, notification.receiptId, signal);
        } catch (err) {
          if (signal.aborted) {
            return;
          }

          onErrorRef.current(err instanceof Error ? err.message : 'Ошибка получения сообщений');
          await sleep(RETRY_DELAY, signal);
        }
      }
    })();

    return () => controller.abort();
  }, [credentials]);
}
