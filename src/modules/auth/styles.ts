import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--bg);
  color: var(--text);
`;

export const Card = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 32px 28px;
  background: var(--panel);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(30, 40, 90, 0.08);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const Logo = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 16px;
  background: var(--accent-grad);
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
`;

export const Label = styled.label`

`

export const Input = styled.input`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  background: var(--bg);
  color: var(--text);
  outline: none;
`

export const Error = styled.div`
  color: var(--danger);
  font-size: 13px;
`;

export const AuthButton = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 12px;
  background: var(--accent-grad);
  color: #fff;
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

export const CardFooter = styled.footer`
  display: flex;
  flex-direction: column;
`;

export const FooterTitle = styled.p`
  margin: 0 0 4px;
  color: var(--text);
  font-size: 13px;
  font-weight: 500;
`;

export const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
  color: var(--muted);
  font-size: 12px;
`;

export const FooterLink = styled.a`
  color: var(--accent);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterMutedText = styled.p`
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 12px;
`;
