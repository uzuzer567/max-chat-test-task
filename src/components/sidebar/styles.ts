import styled from '@emotion/styled';

export const Wrapper = styled.aside`
  width: 77px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--panel);
  border-right: 1px solid var(--border);
  padding: 20px 0;
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavigationItem = styled.button<{ isActive: boolean }>`
  min-height: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ isActive }) => isActive ? 'var(--accent-tint)' : 'transparent'};
  color: ${({ isActive }) => isActive ? 'black' : 'var(--muted)'};
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
`;

export const IconWrapper = styled.span`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
    
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Label = styled.span`
  font-size: 12px;
`;

export const Actions = styled.div`
  margin-top: auto;
`;

export const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0 auto;
  color: var(--muted);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
`;
