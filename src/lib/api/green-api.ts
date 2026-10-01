import { type Credentials, GreenApiError, type Notification } from './types';

const getUrl = (credentials: Credentials, method: string, suffix = '')=> {
  const baseUrl = credentials.apiUrl.replace(/\/+$/, '');
  return `${baseUrl}/waInstance${credentials.idInstance}/${method}/${credentials.apiTokenInstance}${suffix}`;
}

async function request<T>(
  credentials: Credentials,
  method: string,
  init: RequestInit & { suffix?: string } = {},
): Promise<T> {
  const { suffix, ...rest } = init;

  let result: Response;

  try {
    result = await fetch(getUrl(credentials, method, suffix), {
      ...rest,
      headers: rest.body
        ? {
          'Content-Type': 'application/json',
        }
        : undefined,
    });
  } catch {
    throw new GreenApiError('Не удалось подключиться к GREEN-API. Проверьте правильность idInstance, apiTokenInstance и apiUrl.');
  }

  if (!result.ok) {
    const text = await result.text().catch(() => '');

    if (result.status === 401 || result.status === 403) {
      throw new GreenApiError('Неверный idInstance или apiTokenInstance', result.status);
    }

    throw new GreenApiError(`Ошибка GREEN-API ${result.status}${text ? `: ${text}` : ''}`, result.status);
  }

  const text = await result.text();

  return (text ? JSON.parse(text) : null) as T;
}

export const getStateInstance = (credentials: Credentials) => {
  return request<{ stateInstance: string }>(credentials, 'getStateInstance');
};

export const checkAccount = (credentials: Credentials, phone: number) => {
  return request<{ exist: boolean; chatId: string }>(credentials, 'checkAccount', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: phone }),
  });
};

export const sendMessage = (credentials: Credentials, chatId: string, message: string) => {
  return request<{ idMessage: string }>(credentials, 'sendMessage', {
    method: 'POST',
    body: JSON.stringify({ chatId, message }),
  });
};

export const receiveNotification = (credentials: Credentials, receiveTimeout: number, signal?: AbortSignal) => {
  return request<Notification | null>(credentials, 'receiveNotification', {
    suffix: `?receiveTimeout=${receiveTimeout}`,
    signal,
  });
};

export const deleteNotification = (credentials: Credentials, receiptId: number, signal?: AbortSignal) => {
  return request<{ result: boolean }>(credentials, 'deleteNotification', {
    method: 'DELETE',
    suffix: `/${receiptId}`,
    signal,
  });
};
