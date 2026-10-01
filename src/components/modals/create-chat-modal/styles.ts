import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(20, 20, 35, 0.35);
`;

export const Modal = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  background: var(--panel);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(30, 40, 90, 0.16);
`;

export const Title = styled.h2`
  margin: 0;
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
`;

export const Label = styled.label`
  color: var(--muted);
  font-size: 13px;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  background: var(--bg);
  color: var(--text);
  outline: none;
  font-size: 13px;
`;

export const Hint = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.4;
`;

export const Error = styled.div`
  color: var(--danger);
  font-size: 12px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const BaseButton = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
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

export const CancelButton = styled(BaseButton)`
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
`;

export const CreateButton = styled(BaseButton)`
  background: var(--accent-grad);
  color: #fff;
`;
