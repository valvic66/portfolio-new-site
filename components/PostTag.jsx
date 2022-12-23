import React from 'react';

export const PostTag = ({ tags }) => {
  return (
    <section className="">
      {tags?.map((tag, key) => (
        <span key={key} className=" text-xs sm:text-sm mr-1 text-gray-600">
          #{tag}
        </span>
      ))}
    </section>
  );
};
