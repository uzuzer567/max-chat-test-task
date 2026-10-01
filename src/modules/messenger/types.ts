import type { Credentials } from '../../lib/api/types';

export type Props = {
  credentials: Credentials;
  handleLogout: () => void;
};
