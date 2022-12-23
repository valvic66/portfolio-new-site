import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { shimmer, toBase64 } from '../utils';
import { ContentRenderer } from './ContentRenderer';
import { PostTag } from './PostTag';

export const BlogPostCard = ({ post }) => {
  const { slug, title, date, 
    // tags 
  } = post;
  // const { url, width, height, fileName } = bannerImage ?? {};

  return (
    <article className="grid md:grid-cols-[40%_60%] p-5 font-lato rounded bg-gray-100">
      {/* <div className="">
        <Link
          href={{
            pathname: '/blog/[slug]',
            query: {
              slug,
            },
          }}
        >
          <div className="w-full relative h-60 sm:h-72 md:h-44 cursor-pointer">
            <Image
              className="z-0"
              src={url}
              alt={fileName}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(width, height)
              )}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
      </div> */}
      <div className="flex flex-col md:justify-between md:p-3">
        <header>
          {/* <div className="mt-1">
            <PostTag tags={tags} />
          </div> */}
          <p className="text-xl sm:text-2xl md:text-3xl md:mt-3 font-semibold tracking-tight">
            <Link
              href={{
                pathname: '/b/[slug]',
                query: {
                  slug,
                },
              }}
            >
              {title}
            </Link>
          </p>
        </header>
        <footer>
          <p className="text-sm sm:text-sm text-right text-gray-500">
            {new Date(date).toDateString()}
          </p>
        </footer>
      </div>
    </article>
  );
};
