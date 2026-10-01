import styled from '@emotion/styled';

export const Wrapper = styled.aside<{ hasActiveChat: boolean }>`
  width: 394px;
  display: flex;
  flex-direction: column;
  padding: 19px 0;
  gap: 15px;
  background: var(--panel);
  border-right: 1px solid var(--border);

  @media (max-width: 720px) {
    width: 100%;
    border-right: 0;
    ${({ hasActiveChat }) => hasActiveChat && `display: none;`}
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 23px;
  font-weight: 600;
  color: var(--text);
`;

export const CreateButton = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--accent-grad);
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    transform: translate(-50%, -50%);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

export const EmptyChatList = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyChatListTitle = styled.h2`
  margin: 0 0 6px;
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
`;

export const EmptyChatListText = styled.p`
  max-width: 280px;
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  text-align: center;
`;

export const ChatList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ChatItem = styled.button<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  gap: 16px;
  text-align: left;
  border: 0;
  padding: 12px 16px 12px 20px;
  background: ${({ isActive }) => isActive ? 'var(--active)' : 'transparent'};
  color: var(--text);
  cursor: pointer;
  
  &:hover {
    background: var(--hover);
  }

  ${({ isActive }) => isActive && `
    &:hover {
      background: var(--active);
    }
  `}

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
`

export const ChatBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const ChatName = styled.span`
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ChatTime = styled.span`
  color: var(--muted);
  font-size: 13px;
`

export const ChatPreview = styled.span`
  min-width: 0;
  color: var(--muted);
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const MessageCount = styled.span`
  min-width: 20px;
  padding: 4px 6px 4.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  line-height: 1;
`
