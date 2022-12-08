import React from 'react';

export const PostTag = ({ tags }) => {
  return (
    <section className="">
      {tags?.map((tag, key) => (
        <span key={key} className="text-sm sm:text-base mr-1 text-gray-600 uppercase">#{tag}</span>
      ))}
    </section>
  );
};
