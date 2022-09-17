import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Create() {
  const [title, setTitle] = useState('');
  const userId = 1;
  const router = useRouter();

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const body = { title, userId };

      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setTitle('');
      await router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-20 w-full max-w-xs mx-auto">
      <form
        onSubmit={submitData}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!title}
        >
          Create
        </button>
      </form>
    </div>
  );
}
