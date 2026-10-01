import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: var(--bg);
  color: var(--text);
  overflow: hidden;

  @media (max-width: 720px) {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;
