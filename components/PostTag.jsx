import React from 'react';

export const PostTag = ({ tags }) => {
  return (
    <section className="">
      {tags?.map((tag) => (
        <span className="text-sm sm:text-base mr-3">#{tag}</span>
      ))}
    </section>
  );
};
