import { memo } from 'react';
import { STATUS_ICON } from './consts';
import {
  Wrapper,
  Text,
  Meta,
  Status,
} from './styles';
import type { Props } from './types';

const Message = ({ message }: Props) => {
  const time = new Date(message.timestamp).toLocaleTimeString(
    'ru-RU',
    { hour: '2-digit', minute: '2-digit' },
  );

  return (
    <Wrapper outgoing={message.outgoing}>
      <Text>{message.text}</Text>

      <Meta>
        {time}

        {message.outgoing && message.status && (
          <Status status={message.status}>
            {' '}
            {STATUS_ICON[message.status]}
          </Status>
        )}
      </Meta>
    </Wrapper>
  )
};

export default memo(Message);
