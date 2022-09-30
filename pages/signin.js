import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES, APP_ROUTES } from '../constants/routes';
import { storeToLocalStorage } from '../utils';
import { useRouter } from 'next/router';
import { Sign } from '../components/Sign';

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const router = useRouter();

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

      storeToLocalStorage('token', response.data.token);
      storeToLocalStorage('user', JSON.stringify({ email, password }));

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
