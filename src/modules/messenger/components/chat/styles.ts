import styled from '@emotion/styled';

export const Wrapper = styled.main<{ isEmpty?: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg);

  @media (max-width: 720px) {
    width: 100%;
  }

  ${({ isEmpty }) =>
    isEmpty && `
      align-items: center;
      justify-content: center;
    `}
`

export const EmptyChatPlaceholder = styled.div`
  color: var(--muted);
  text-align: center;
  font-size: 14px;
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 13px 19px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
`;

export const BackButton = styled.button`
  flex-shrink: 0;
  border: 0;
  background: none;
  color: var(--muted);
  padding: 4px 8px;
  font-size: 22px;
  cursor: pointer;

  @media (max-width: 720px) {
    font-size: 14px;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  color: var(--text);
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.div`
  color: var(--muted);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ErrorBanner = styled.div`
  padding: 6px 16px;
  background: var(--danger);
  color: #fff;
  font-size: 13px;
`;

export const Messages = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px max(16px, calc((100% - 760px) / 2));
  scroll-behavior: smooth;

  @media (max-width: 720px) {
    padding: 12px;
  }
`;

export const MessageInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 10px max(16px, calc((100% - 760px) / 2)) 14px;
  background: var(--bg);
    
  @media (max-width: 720px) {
    padding: 8px 12px 12px;
  }
`;

export const MessageInput = styled.textarea`
  flex: 1;
  min-width: 0;
  resize: none;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--panel);
  color: var(--text);
  padding: 13px 16px;
  outline: none;
`;

export const SendButton = styled.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: var(--accent-grad);
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 160ms ease, transform 160ms ease;

  &:not(:disabled):hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
