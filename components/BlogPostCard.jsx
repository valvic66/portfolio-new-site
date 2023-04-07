// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getFormattedDate, shimmer, toBase64 } from '../utils';
import { ContentRenderer } from './ContentRenderer';
import { PostTag } from './PostTag';

export const BlogPostCard = ({ post }) => {
  const { slug, title, date: blogDate, image, tags } = post;
  // const { url, width, height, fileName } = bannerImage ?? {};

  return (
    <article className="grid md:grid-cols-[40%_60%] rounded bg-gray-100">
      <div className="mt-3">
        <Link
          href={{
            pathname: '/blog/[slug]',
            query: {
              slug,
            },
          }}
        >
          <div className="w-full relative cursor-pointer">
            <img className="z-0" src={image} alt={slug} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:justify-between mt-6 md:px-2">
        <h3 className="font-semibold tracking-tight">
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: {
                slug,
              },
            }}
          >
            {title}
          </Link>
        </h3>

        <div className="flex items-center justify-between mt-3">
          <div className="mt-1">
            <PostTag tags={tags} />
          </div>

          <p className="text-md sm:text-lg mr-1 uppercase text-gray-500 tracking-tighter">
            {getFormattedDate(blogDate)}
          </p>
        </div>
      </div>
    </article>
  );
};
