import { type FormEvent, memo, useState } from 'react';
import { getStateInstance } from '../../lib/api/green-api';
import { DEFAULT_API_URL } from '../../lib/api/consts';
import {
  Wrapper,
  Card,
  CardHeader,
  Logo,
  Field,
  Label,
  Input,
  Error,
  AuthButton,
  CardFooter,
  FooterTitle,
  FooterText,
  FooterLink,
  FooterMutedText,
} from './styles';
import type { Props } from './types';

const Auth = ({ handleLogin }: Props)=> {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCredentials = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();

    const credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim() || DEFAULT_API_URL,
    };

    setError(null);
    setIsLoading(true);

    try {
      const { stateInstance } = await getStateInstance(credentials);

      if (stateInstance !== 'authorized') {
        setError(`Инстанс не авторизован. Авторизуйте его в личном кабинете GREEN-API.`);
        return;
      }

      handleLogin(credentials);
    } catch (err) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message :
          'Не удалось войти';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <Card onSubmit={sendCredentials}>
        <CardHeader>
          <Logo>MAX</Logo>
        </CardHeader>

        <Field>
          <Label htmlFor="idInstance">idInstance</Label>
          <Input
            id="idInstance"
            value={idInstance}
            onChange={event => setIdInstance(event.target.value)}
            placeholder="••••••••••••"
            inputMode="numeric"
            required
            autoFocus
            disabled={isLoading}
          />
        </Field>

        <Field>
          <Label htmlFor="apiTokenInstance">apiTokenInstance</Label>
          <Input
            id="apiTokenInstance"
            value={apiTokenInstance}
            onChange={event => setApiTokenInstance(event.target.value)}
            type="password"
            placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
            required
            disabled={isLoading}
          />
        </Field>

        <Field>
          <Label htmlFor="apiUrl">apiUrl</Label>
          <Input
            id="apiUrl"
            value={apiUrl}
            onChange={event => setApiUrl(event.target.value)}
            placeholder={DEFAULT_API_URL}
            disabled={isLoading}
          />
        </Field>

        {error && <Error>{error}</Error>}

        <AuthButton
          type="submit"
          disabled={!idInstance.trim() || !apiTokenInstance.trim() || isLoading}
        >
          {isLoading ? 'Проверка…' : 'Войти'}
        </AuthButton>

        <CardFooter>
          <FooterTitle>Как получить данные для входа?</FooterTitle>
          <FooterText>
            <span>
              1. Откройте{' '}
              <FooterLink
                href="https://console.green-api.com"
                target="_blank"
                rel="noopener noreferrer"
              >личный кабинет GREEN-API</FooterLink>.
            </span>
            <span>
              2. Создайте инстанс для MAX и пройдите авторизацию по QR-коду.
            </span>
            <span>
              3. Скопируйте idInstance, apiTokenInstance и apiUrl (опционально) из настроек инстанса.
            </span>
          </FooterText>
          <FooterMutedText>
            Данные инстанса хранятся только в вашем браузере и отправляются напрямую в GREEN-API.
          </FooterMutedText>
        </CardFooter>
      </Card>
    </Wrapper>
  )
}

export default memo(Auth);
