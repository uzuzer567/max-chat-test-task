import type { Credentials } from '../../lib/api/types';

export type Props = {
  handleLogin: (credentials: Credentials) => void;
};
