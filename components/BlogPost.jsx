import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { shimmer, toBase64 } from '../utils';
import { ContentRenderer } from './ContentRenderer';
import { PostTag } from './PostTag';

export const BlogPost = ({ post, isDetailed = false }) => {
  const { slug, title, subheading, tags, content, date, bannerImage } = post;
  const { url, width, height, fileName } = bannerImage ?? {};

  return (
    <article className="grid auto-rows-auto md:grid-cols-2 p-5 font-lato">
      <div className="w-full relative h-60 h- sm:h-72">
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
      <div className="flex flex-col md:justify-between md:p-3">
        <header>
          <div className="mt-1">
            <PostTag tags={tags} />
          </div>
          <p className="text-xl sm:text-2xl font-semibold tracking-wide">
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
          </p>
        </header>
        <footer>
          <p className="text-xs sm:text-sm text-right">
            {new Date(date).toDateString()}
          </p>
        </footer>
      </div>
      {/* {!isDetailed && (
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
        )} */}
      {isDetailed && (
        <article>
          <ContentRenderer contentHtml={content?.html} />
        </article>
      )}
    </article>
  );
};
