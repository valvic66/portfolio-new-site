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

  return true;
}

function useAuthentication() {
  const [authenticated, setAuthenticationStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function checkAuthentication() {
      const isAuthenticated = isUserAuthenticated();

      if (!isAuthenticated) {
        router.push(APP_ROUTES.SIGN_IN);

        return;
      }

      setAuthenticationStatus(isAuthenticated);
    }

    checkAuthentication();
  }, []);

  return { authenticated };
}

export default useAuthentication;
