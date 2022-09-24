import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API_ROUTES, APP_ROUTES } from '../utils/routes';
import axios from 'axios';

export const storeToLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

const getFromLocalStorage = (name) => {
  return localStorage.getItem(name);
};

function isUserAuthenticated() {
  const token = getFromLocalStorage('token');

  if (!token) {
    return false;
  }

  return {
    token,
    authenticated: true,
  };
}

function useAuthentication() {
  const [authenticated, setAuthenticationStatus] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthentication() {
      const { token, authenticated } = isUserAuthenticated();

      if (!authenticated) {
        router.push(APP_ROUTES.SIGN_IN);

        return;
      }

      setAuthenticationStatus(authenticated);

      const response = await axios({
        method: 'POST',
        url: API_ROUTES.GET_USER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response?.data?.user);
    }

    checkAuthentication();
  }, []);

  return { authenticated, user };
}

export default useAuthentication;
