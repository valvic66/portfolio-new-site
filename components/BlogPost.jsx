import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { shimmer, toBase64 } from '../utils';

export const BlogPost = ({ post }) => {
  const { slug, title, subheading, tags, content, date, bannerImage } = post;
  const { url, width, height, fileName } = bannerImage ?? {};

  return (
    <div className="w-full h-auto flex flex-col">
      <p className="pb-1">{title}</p>
      <p className="pb-1 text-xs">{new Date(date).toDateString()}</p>
      <div>
        <Image
          className="relative z-0 rounded-md"
          src={url}
          alt={fileName}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height)
          )}`}
          layout="responsive"
          width={width}
          height={height}
        />
      </div>
      <p className="pb-1">{subheading}</p>
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
