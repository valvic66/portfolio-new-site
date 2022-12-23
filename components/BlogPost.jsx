import Image from 'next/image';
import React from 'react';
import { shimmer, toBase64 } from '../utils';
import { PostTag } from './PostTag';

export const BlogPost = ({ post }) => {
  const { slug, title, date, tags, image } = post ?? {};

  return (
    <article className="p-5 font-lato">
      <div className="flex flex-col md:justify-between md:p-3">
        <header>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-sm sm:text-sm text-right mr-1 uppercase text-gray-500">
              {new Date(date).toDateString()}
            </p>
            <PostTag tags={tags} />
          </div>
          <p className="text-xl sm:text-4xl font-semibold tracking-tight mt-5">
            {title}
          </p>
        </header>
      </div>
      <div className="w-full relative">
        <Image
          className="z-0"
          src={image}
          alt={slug}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(612, 350)
          )}`}
          layout="responsive"
          objectFit="content"
          width={612}
          height={350}
        />
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

      {/* <div className="mt-10">
        <ContentRenderer contentHtml={content?.html} />
      </div> */}
    </article>
  );
};
