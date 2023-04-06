// import Image from 'next/image';
import React from 'react';
import { getFormattedDate, shimmer, toBase64 } from '../utils';
import { PostTag } from './PostTag';

export const BlogPost = ({ post }) => {
  const { slug, title, date: blogDate, tags, image } = post ?? {};

  return (
    <header className="font-roboto">
      <p className="text-md sm:text-lg mr-1 uppercase text-gray-500 tracking-tighter">
        {getFormattedDate(blogDate)}
      </p>
      <h1 className="tracking-tight mt-3 leading-tight">{title}</h1>
      <div className="mt-3">
        <PostTag tags={tags} />
      </div>
      <div className="w-full relative mt-6">
        <img className="z-0" src={image} alt={slug} />
      </div>
    </header>
  );
};
