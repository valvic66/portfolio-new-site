import React from 'react';

export const MediaIcon = ({children}) => {
  return (
    <div className="p-2 rounded-md border border-gray-400 shadow-md shadow-gray-400 cursor-pointer hover:scale-105 ease-in duration-300">
      {children}
    </div>
  );
};
