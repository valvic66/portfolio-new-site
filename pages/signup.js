import axios from 'axios';
import React from 'react';

export default function signup() {
  const signUp = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/auth/signup',
        data: {
          email: 'test@gmail.com',
          password: 'Test_2022',
          firstname: 'Vali',
          lastname: 'Micu',
        },
      });

      if (!response?.data?.token) {
        console.log('Something went wrong during signing up: ', response);
        return;
      }

      console.log({ response });
    } catch (err) {
      console.log('Some error occured during signing up: ', err);
    }
  };

  return (
    <button className="pt-20" onClick={signUp}>
      signup
    </button>
  );
}
