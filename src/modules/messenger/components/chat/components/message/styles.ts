import styled from '@emotion/styled'

export const Wrapper = styled.div<{ outgoing: boolean }>`
  max-width: min(75%, 520px);
  padding: 4px 12px 3px;
  border-radius: 16px;
  word-wrap: break-word;
  align-self: ${({ outgoing }) => 
    outgoing ? 'flex-end' : 'flex-start'};
  background: ${({ outgoing }) => 
    outgoing ? 'var(--bubble-out)' : 'var(--bubble-in)'};
  ${({ outgoing }) =>
    outgoing ? 'border-bottom-right-radius: 4px;' : 'border-bottom-left-radius: 4px;'}
`;

export const Text = styled.div`
  white-space: pre-wrap;
  color: var(--text);
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  font-size: 11px;
  color: var(--muted);
`;

export const Status = styled.span<{ status: string }>`
  color: ${({ status }) => {
    switch (status) {
      case 'sent':
        return 'var(--accent)';

      case 'failed':
        return 'var(--danger)';

      default:
        return 'var(--muted)';
    }
  }};
`;
