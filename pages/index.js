import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Navbar } from '../components/Navbar';
import useAuth from '../store/auth';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '../constants/routes';
import { IS_AUTH_ENABLED } from '../constants/env';
import { useLocalStorage } from 'react-use';

function Home() {
  const router = useRouter();
  const saveToken = useAuth((state) => state.setToken);
  const saveUser = useAuth((state) => state.setUser);
  const [token, setToken] = useLocalStorage('token', '');
  const [user, setUser] = useLocalStorage('user', {});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (token && user) {
        saveToken(token);
        saveUser(user);
        setAuthenticated(true);
      } else {
        router.push(APP_ROUTES.SIGN_IN);
      }
    };

    IS_AUTH_ENABLED && checkAuth();
  }, [router, setToken, setUser, token, user, saveToken, saveUser]);

  if (IS_AUTH_ENABLED && !authenticated) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className=" pt-20 ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-900" />
      </div>
    );
  }

  return (
    <main>
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
    </main>
  );
}

export default Home;
