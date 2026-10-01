export interface Credentials {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export interface Chat {
  chatId: string;
  name: string;
  phone?: string;
  unread: number;
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  outgoing: boolean;
  timestamp: number;
  status?: 'sending' | 'sent' | 'failed';
}

export interface Notification {
  receiptId: number;
  body: {
    typeWebhook: string;
    timestamp?: number;
    idMessage?: string;
    senderData?: {
      chatId: string;
      sender?: string;
      senderName?: string;
      chatName?: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: { textMessage: string };
      extendedTextMessageData?: { text: string };
    };
  };
}

export class GreenApiError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}
