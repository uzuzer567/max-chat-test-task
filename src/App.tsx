import { useState } from 'react';
import Auth from './modules/auth';
import Messenger from './modules/messenger';
import type { Credentials } from './lib/api/types';
import { clearCredentials, loadCredentials, saveCredentials } from './utils';

export default function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(loadCredentials);

  if (!credentials) {
    return (
      <Auth
        handleLogin={newCredentials => {
          saveCredentials(newCredentials);
          setCredentials(newCredentials);
        }}
      />
    );
  }

  return (
    <Messenger
      key={credentials.idInstance}
      credentials={credentials}
      handleLogout={() => {
        clearCredentials();
        setCredentials(null);
      }}
    />
  );
}
