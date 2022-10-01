import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES, APP_ROUTES } from '../constants/routes';
import { useRouter } from 'next/router';
import { Sign } from '../components/Sign';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const router = useRouter();
  const [token, setToken] = useLocalStorage('token', '');
  const [uuser, setUser] = useLocalStorage('user', {});

  const signIn = async (values) => {
    const { email, password } = values;
    setApiError('');

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN,
        data: {
          email,
          password,
        },
      });

      setToken(response.data.token);
      setUser({ email, password });

      router.push(APP_ROUTES.HOME);
    } catch (error) {
      setApiError(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sign
      headerText="Please sign in"
      buttonLabel="Sign in"
      linkText="Go to signup page"
      linkLabel="Signup"
      signApi={signIn}
      apiError={apiError}
      isLoading={isLoading}
    />
  );
}
