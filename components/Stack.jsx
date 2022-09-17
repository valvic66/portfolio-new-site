import React from 'react';

export const Stack = ({ stack }) => {
  return (
    <>
      {stack?.map((tech, key) => (
        <span
          className={`text-xs font-semibold py-1 px-2 uppercase rounded-full ${
            stack.indexOf(tech) === 0
              ? 'text-pink-600 bg-pink-200'
              : 'text-green-600 bg-green-200'
          } mr-2`}
          key={key}
        >
          {tech}
        </span>
      ))}
    </>
  );
};
