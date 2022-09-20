import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function signup() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();

    const { email, password } = userData;

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: '/api/auth/signup',
        data: {
          email,
          password,
          firstname: 'Vali',
          lastname: 'Micu',
        },
      });

      if (!response?.data?.token) {
        console.log('Something went wrong during signing up: ', response);
        return;
      }

      setUserData({ email: '', password: '' });
    } catch (err) {
      console.log('Some error occured during signing up: ', err);
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
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        autoComplete="off"
      >
        <input type="hidden" value="something”" />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            placeholder="email"
            autoFocus
            required
            onChange={handleChange}
            value={userData.email}
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            placeholder="password"
            required
            onChange={handleChange}
            value={userData.password}
            autoComplete="off"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex"
          type="submit"
          disabled={!userData.email || !userData.password}
          onClick={signUp}
        >
          {isLoading ? (
            <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" />
          ) : null}
          Sign up
        </button>
      </form>
    </div>
  );
}
