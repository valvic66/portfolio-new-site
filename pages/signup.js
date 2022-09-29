import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { API_ROUTES, APP_ROUTES } from '../constants/routes';
import { storeToLocalStorage } from '../utils';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// implement Formik later
export default function Signup() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const signUp = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password, firstname, lastname } = userData;

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_UP,
        data: {
          email,
          password,
          firstname,
          lastname,
        },
      });

      storeToLocalStorage('token', response.data.token);
      storeToLocalStorage(
        'user',
        JSON.stringify({ email, password, firstname, lastname })
      );

      setUserData({ email: '', password: '' });
      router.push(APP_ROUTES.HOME);
    } catch (error) {
      setError(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="pt-20 w-full max-w-xs mx-auto">
      <div className="bg-white shadow-md rounded px-4 pt-6">
        <p className='text-lg text-blue-700 pb-2 pl-2'>Please sign up</p>
        <form className="" autoComplete="off">
          <input type="hidden" value="something”" />
          <div className="mb-4">
            <label htmlFor="email" />
            <TextField
              className='w-full'
              required
              id="email"
              name="email"
              autoFocus
              label="Email"
              onChange={handleChange}
              value={userData.email}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" />
            <TextField
              className='w-full'
              required
              id="password"
              name="password"
              label="Password"
              onChange={handleChange}
              value={userData.password}
              autoComplete="off"
            />
          </div>
          <Button
            className=""
            type="submit"
            disabled={!userData.email || !userData.password}
            onClick={signUp}
            variant="outlined"
          >
            {isLoading ? (
              <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" />
            ) : null}
            Sign up
          </Button>
        </form>
        {error && <p className="text-red-600 text-xs pt-2">{error}</p>}
        <div className="flex items-center justify-evenly">
          <p className="block text-gray-700 text-sm font-bold p-5">
            Go to login page
          </p>
          <Link href="/signin">
            <li className=" text-blue-800 text-base list-none underline">
              Login
            </li>
          </Link>
        </div>
      </div>
    </div>
  );
}
