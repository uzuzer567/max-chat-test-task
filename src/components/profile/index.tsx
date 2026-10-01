import { memo } from 'react';
import { Wrapper } from './styles';
import type { Props } from './types';
import { getColor, getPreparedName } from './utils';

const Profile = ({ name, size }: Props) => {
  return (
    <Wrapper style={{ background: getColor(name), width: size, height: size }}>
      {getPreparedName(name)}
    </Wrapper>
  );
};

export default memo(Profile);
