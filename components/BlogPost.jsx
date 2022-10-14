import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { shimmer, toBase64 } from '../utils';

export const BlogPost = ({ post }) => {
  const {
    data: { title, cover_image, date },
    slug,
  } = post;

  return (
    <div className="w-full h-auto flex flex-col">
      <Image
        className="relative z-0 rounded-md"
        src={cover_image}
        alt="blog post image"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(6000, 4000)
        )}`}
        width="6000"
        height="4000"
        layout="responsive"
      />
      <p className="pb-1">{title}</p>
      <p className="pb-1 text-xs">Posted on: {date}</p>
      <Link
        href={{
          pathname: '/blog/[slug]',
          query: {
            slug,
          },
        }}
      >
        <button className="text-sm bg-black text-white py-2 rounded-sm">
          Read more
        </button>
      </Link>
    </div>
  );
};
