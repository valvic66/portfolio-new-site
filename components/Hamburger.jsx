import React from 'react';

export const Hamburger = ({ onClick, isNavVisible }) => {
  const genericLine = `
    h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300
  `;
  
  return (
    <button 
      className="w-10 h-10 border border-gray-400 rounded flex flex-col justify-center items-center group bg-none"
      onClick={onClick}  
    >
      <div className={`${genericLine} ${isNavVisible ? "rotate-45 translate-y-1" : ""}`}></div>
      <div className={`${genericLine} ${isNavVisible ? "-rotate-45 -translate-y-1" : ""}` }></div>
    </button>
  );
};
