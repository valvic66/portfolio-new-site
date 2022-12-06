import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { shimmer, toBase64 } from '../utils';
import { ContentRenderer } from './ContentRenderer';

export const BlogPost = ({ post, isDetailed = false }) => {
  const { slug, title, subheading, tags, content, date, bannerImage } = post;
  const { url, width, height, fileName } = bannerImage ?? {};

  return (
    <section className="w-full h-auto flex flex-col max-w-4xl m-auto">
      <header>
        <p className="text-3xl uppercase text-center mt-20">{title}</p>
        <p className="text-xl text-center mt-3">{subheading}</p>
        <p className="text-xs text-center mt-1">
          {new Date(date).toDateString()}
        </p>
        <div className="mt-20">
          <Image
            className="relative z-0"
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
        {!isDetailed && (
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
        )}
      </header>
      {isDetailed && (
        <article>
          <ContentRenderer contentHtml={content?.html} />
        </article>
      )}
    </section>
  );
};
