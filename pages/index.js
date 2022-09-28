import React, { useEffect } from 'react';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Navbar } from '../components/Navbar';
import useAuth from '../store';
import { getFromLocalStorage } from '../utils';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '../constants/routes';
import { IS_AUTH_ENABLED } from '../constants/env';

function Home() {
  const router = useRouter();
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const authenticated = !!(token && user);
  const saveToken = useAuth((state) => state.setToken);
  const saveUser = useAuth((state) => state.setUser);

  useEffect(() => {
    const checkAuth = () => {
      const token = getFromLocalStorage('token');
      const user = getFromLocalStorage('user');

      if (token && user) {
        saveToken(token);
        saveUser(user);
      } else {
        router.push(APP_ROUTES.SIGN_IN);
      }
    };

    IS_AUTH_ENABLED && checkAuth();
  }, [user, token]);

  if (IS_AUTH_ENABLED && !authenticated) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className=" pt-20 ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-900" />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Vali | Front-End Developer</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Navbar authenticated={authenticated} />
      <Main />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default Home;
